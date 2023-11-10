import {genSalt, hash} from "bcryptjs";
import {DynamoDBClient, PutItemCommand} from "@aws-sdk/client-dynamodb";
import {DynamoDBDocumentClient, PutCommand} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient();
const documentClient = DynamoDBDocumentClient.from(client);

export class UserModel{
    async create( email: string, password: string){

        const salt = await genSalt(10);
        const hashPassword = await hash(password, salt);
        const putCommand = new PutCommand({
            Item: {
                ID: 'IDIDI',
                email: 'asd',
                hashPassword: 'asd'
            },
            TableName: process.env.DYNAMODB_USER_TABLE

        });

        return await documentClient.send(putCommand);
    }
}