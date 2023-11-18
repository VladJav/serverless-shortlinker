import express from 'express';
import serverless from 'serverless-http';
import {authRouter} from './routes/authRoutes';
import {notFoundMiddleware} from "./middleware/notFound";
import {errorHandlerMiddleware} from "./middleware/errorHandler";
import {userRouter} from "./routes/userRoutes";
import openApiJson from './swagger.json';
import {
    APIGatewayProxyEvent,
    Context,
} from "aws-lambda";
import { Request} from "express";
import {linkRouter} from "./routes/linkRoutes";
import {redirectLink} from "./controllers/linkController";
import {swaggerHtml} from "./utils/swaggerHtml";
const app = express();

app.use(express.json());

app.get("/api-docs", async (req, res) => {
    res.set("Content-Type", "text/html; charset=utf-8");
    res.send(swaggerHtml());
});

app.get(["/swagger.json", "/api-docs/swagger.json"], async (req, res) => {
    res.set("Content-Type", "application/json; charset=utf-8");
    res.send(openApiJson);
});
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/links', linkRouter);
app.get('/:path', redirectLink);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

export const handler = serverless(app, {
    request: function (req: Request, event: APIGatewayProxyEvent, context: Context) {
        req.user = {
            email: event.requestContext.authorizer?.email,
            userId: event.requestContext.authorizer?.userId
        };
    }});
