import {documentClient} from "../db/dynamoDb";
import {GetCommand, PutCommand} from "@aws-sdk/lib-dynamodb";

export class TokenModel{
    static async save(userId: string, userAgent: string, refreshToken: string) {
        const item = {
            id: userId,
            refreshToken,
            userAgent
        };
        const putCommand = new PutCommand({
            Item: item,
            TableName: process.env.DYNAMODB_TOKEN_TABLE
        })
        await documentClient.send(putCommand);
        return item;
    }
    static async findById(id: string){
        const queryCommand = new GetCommand({
            Key: {
                id
            },
            TableName: process.env.DYNAMODB_TOKEN_TABLE

        });
        const findResult = await documentClient.send(queryCommand);
        return findResult.Item;
    }
}