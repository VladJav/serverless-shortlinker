import {Handler, PolicyDocument} from 'aws-lambda'
import jwt from 'jsonwebtoken';

function generatePolicy (effect: string, resource: string): PolicyDocument {
    const policyDocument = {} as PolicyDocument;
    if (effect && resource) {
        policyDocument.Version = '2012-10-17';
        policyDocument.Statement = [];
        const statementOne: any = {};
        statementOne.Action = 'execute-api:Invoke';
        statementOne.Effect = effect;
        statementOne.Resource = resource;
        policyDocument.Statement[0] = statementOne;
    }
    return policyDocument;
}

export const handler: Handler = (event, context, callback) => {
    if(!event.authorizationToken){
        return callback('Unauthorized');
    }
    const tokenParts = event.authorizationToken.split(' ');
    const tokenValue = tokenParts[1];

    if (!(tokenParts[0].toLowerCase() === 'bearer' && tokenValue)) {
        return callback('Unauthorized');
    }
    try {
        const decoded = jwt.verify(tokenValue, process.env.JWT_ACCESS_SECRET!);
        return callback(null, {
            policyDocument: generatePolicy('Allow', event.methodArn),
            principalId: decoded.sub
        });
    } catch (err) {
        return callback('Unauthorized');
    }
};