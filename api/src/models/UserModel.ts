import {genSalt, hash} from "bcryptjs";
import { v4 as uuidv4 } from 'uuid';
import {PutCommand, QueryCommand, UpdateCommand} from "@aws-sdk/lib-dynamodb";
import {documentClient} from "../db/dynamoDb";

export class UserModel{
    static async create( email: string, password: string, activationCode: string){

        const salt = await genSalt(10);
        const hashPassword = await hash(password, salt);
        const item = {
            id: uuidv4(),
            email,
            password: hashPassword,
            activationCode,
            isActivated: false
        };
        const putCommand = new PutCommand({
            Item: item,
            TableName: process.env.DYNAMODB_USER_TABLE
        });

        await documentClient.send(putCommand);
        return item;
    }
    static async updateActivationStatus(id: string, isActivated: boolean, activationCode: string){
        const updateCommand = new UpdateCommand({
            TableName: process.env.DYNAMODB_USER_TABLE,
            Key: {
                id
            },
            ExpressionAttributeValues: {
                ':activationCode': activationCode,
                ':isActivated': isActivated
            },
            UpdateExpression: 'SET isActivated = :isActivated, activationCode = :activationCode',
        });
        await documentClient.send(updateCommand);
    }
    static async findById(id: string){
        const queryCommand = new QueryCommand({
            TableName: process.env.DYNAMODB_USER_TABLE,
            KeyConditionExpression: "id = :id",
            ExpressionAttributeValues: {
                ":id": id,
            },
            Limit: 1
        })
        const { Items } = await documentClient.send(queryCommand);
        return Items || [];
    }
    static async findByEmail(email: string){
        const queryCommand = new QueryCommand({
            TableName: process.env.DYNAMODB_USER_TABLE,
            IndexName: 'EmailIndex',
            KeyConditionExpression: "email = :email",
            ExpressionAttributeValues: {
                ":email": email,
            },
            Limit: 1

        })
        const { Items } = await documentClient.send(queryCommand);
        return Items || [];
    }
}