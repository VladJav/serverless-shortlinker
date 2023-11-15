
import { SQSHandler } from "aws-lambda";
import {sendMail} from "./sendMail";

export const handler: SQSHandler = async (event) => {
    try {
        for (const record of event.Records) {
            const { link, user } = JSON.parse(record.body);
            console.log(user);
            console.log(link);
            await sendMail(user.email, link.fullLink, link.visitedTimes);
        }
    } catch (error) {
        console.log(error);
    }
};