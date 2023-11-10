import {genSalt, hash} from "bcryptjs";
import { v4 as uuidv4 } from 'uuid';
import {PutCommand} from "@aws-sdk/lib-dynamodb";
import {documentClient} from "../db/dynamoDb";

export class UserModel{
    async create( email: string, password: string){

        const salt = await genSalt(10);
        const hashPassword = await hash(password, salt);
        const item = {
            ID: uuidv4(),
            email,
            password: hashPassword
        }
        const putCommand = new PutCommand({
            Item: item,
            TableName: process.env.DYNAMODB_USER_TABLE
        });

        await documentClient.send(putCommand);
        return item;
    }
}