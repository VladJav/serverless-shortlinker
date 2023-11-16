import {SendEmailCommand, SESClient} from "@aws-sdk/client-ses";

export const sendVerificationMail = async (toEmail: string, activationCode: string, requestUrl: string) => {
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
                Html: {
                    Data: `<h2>Please click on below link to activate your account</h2>
                           <p>${requestUrl}/auth/activate/${activationCode}</p>
                           <p><b>NOTE: </b> The above activation link expires in 30 minutes.</p>`
                }
            }
        }
    };
    const ses = new SESClient();
    const command = new SendEmailCommand(params);
    return await ses.send(command);
};