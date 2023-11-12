import {Handler, PolicyDocument} from 'aws-lambda'
import jwt, {JwtPayload} from 'jsonwebtoken';
import {generatePolicy} from "./generatePolicy";

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
        const decoded = jwt.verify(tokenValue, process.env.JWT_ACCESS_SECRET!) as JwtPayload;
        return callback(null, {
            policyDocument: generatePolicy('Allow', event.methodArn),
            principalId: decoded.sub,
            context: {
                userId: decoded.userId,
                email: decoded.email
            }
        });
    } catch (err) {
        return callback('Unauthorized');
    }
};