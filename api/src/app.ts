import express from 'express';
import serverless from 'serverless-http';
import {authRouter} from "./routes/authRoutes";
import {notFoundMiddleware} from "./middleware/notFound";
import {errorHandlerMiddleware} from "./middleware/errorHandler";
import {userRouter} from "./routes/userRoutes";
import {
    APIGatewayProxyEvent,
    Context,
} from "aws-lambda";
import { Request} from "express";

const app = express();

app.use(express.json());

app.use('/user', userRouter);
app.use('/auth', authRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

export const handler = serverless(app, {
    request: function (req: Request, event: APIGatewayProxyEvent, context: Context) {
        // context.callbackWaitsForEmptyEventLoop = false;
        req.user = {
            email: event.requestContext.authorizer?.email,
            userId: event.requestContext.authorizer?.userId
        };
    }});
