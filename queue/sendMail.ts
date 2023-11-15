import {SendEmailCommand, SESClient} from "@aws-sdk/client-ses";

export const sendMail = async (toEmail: string, link: string, visitedTimes: number) => {
    try {
        const params = {
            Source: process.env.SOURCE_EMAIL,
            Destination: {
                ToAddresses: [
                    toEmail
                ]
            },
            Message: {
                Subject: {
                    Data: 'Link was deactivated!'
                },
                Body: {
                    Text: {
                        Data: `Your link ${link} was expired. Link was visited ${visitedTimes} times`
                    }
                }
            }
        };
        const ses = new SESClient();
        const command = new SendEmailCommand(params);
        return await ses.send(command);
    }
    catch (e) {
        console.log(e);
    }
};