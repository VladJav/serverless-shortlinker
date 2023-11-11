import express from 'express';
import serverless from 'serverless-http';
import {authRouter} from "./routes/authRoutes";
import {notFoundMiddleware} from "./middleware/notFound";
import {errorHandlerMiddleware} from "./middleware/errorHandler";

const app = express();

app.use(express.json());
app.use('/auth', authRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
app.listen(8000, ()=>{
    console.log('Hi');
})

export const handler = serverless(app);
