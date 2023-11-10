import express from 'express';
import serverless from 'serverless-http';
import {authRouter} from "./routes/authRoutes";

const app = express();

app.use(express.json());
app.use('/auth', authRouter);
app.get('/de', (req, res)=>{
    res.send('GE');
})

app.get('/', async (req, res) => {

    res.json({hello: 'he'});
})

app.listen(8000, ()=>{
    console.log('Hi');
})

export const handler = serverless(app);
