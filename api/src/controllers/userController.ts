import { NextFunction, Request, Response } from "express";
import {LinkModel} from "../models/LinkModel";

export const showMe = async (req: Request, res: Response, next: NextFunction)=> {
    const { userId, email } = req.user;
    console.log(process.env.SOURCE_EMAIL);
    try{
        res.json({
            success: true,
            data: {
                id: userId,
                email
            }
        });
    }
    catch (e){
        next(e);
    }
};