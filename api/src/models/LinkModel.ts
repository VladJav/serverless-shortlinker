import {PutCommand, QueryCommand} from "@aws-sdk/lib-dynamodb";
import {documentClient} from "../db/dynamoDb";
import {v4 as uuidv4} from "uuid";

type createProps = {
    shortLink: string,
    fullLink: string,
    expiresIn: string,
    isOneTime: boolean
    userId: string
};
export class LinkModel{
    static async create({shortLink, fullLink, expiresIn, isOneTime, userId} : createProps ){
        const item = {
            id: uuidv4(),
            user_id: userId,
            shortLink,
            fullLink,
            visitedTimes: 0,
            expiresIn,
            isOneTime
        };
        const putCommand = new PutCommand({
            Item: item,
            TableName: process.env.DYNAMODB_LINK_TABLE
        });
        await documentClient.send(putCommand);
    }
    static async findByShortLink(shortLink: string){
        const queryCommand = new QueryCommand({
            TableName: process.env.DYNAMODB_LINK_TABLE,
            IndexName: 'ShorLinkIndex',
            KeyConditionExpression: "shortLink = :shortLink",
            ExpressionAttributeValues: {
                ":shortLink": shortLink,
            },
            Limit: 1

        })
        const { Items } = await documentClient.send(queryCommand);
        return Items;
    }
}