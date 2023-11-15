import { NextFunction, Request, Response } from "express";

export const showMe = async (req: Request, res: Response, next: NextFunction)=> {
    const { userId, email } = req.user;
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