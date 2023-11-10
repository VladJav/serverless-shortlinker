import { DynamoDB } from 'aws-sdk';

let options = {};
// connect to local DB if running offline
if (process.env.IS_OFFLINE) {
    console.log('1');
    options = {
        region: 'localhost',
        endpoint: 'http://localhost:8000',
    };
}
export const dynamoDbClient = new DynamoDB.DocumentClient(options);