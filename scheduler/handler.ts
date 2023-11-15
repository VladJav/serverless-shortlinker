import {Handler} from "aws-lambda";
import {SendMessageCommand, SQSClient} from "@aws-sdk/client-sqs";
import {LinkModel} from "../api/src/models/LinkModel";
import {UserModel} from "../api/src/models/UserModel";

export const handler: Handler = async (event, context) => {
    try {
        const client = new SQSClient();

        const items = await LinkModel.findExpiredLinks();

        for(const item of items){
            await LinkModel.updateIsActive(item.id, 0);

            const findResult = await UserModel.findById(item.user_id);
            if(!findResult) throw new Error('User not found');
            const [ user ] = findResult;

            const sendParams = new SendMessageCommand({
                MessageBody: JSON.stringify({
                    link: item,
                    user
                }),
                QueueUrl: process.env.MAIL_QUEUE_URL
            });
            await client.send(sendParams);
        }
    }
    catch (e) {
        console.log(e);
    }
};