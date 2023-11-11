import { NextFunction, Request, Response } from "express";

export const showMe = async (req: Request, res: Response, next: NextFunction)=> {
    res.send('YYYYY');
    // const { userId, email } = req.user;
    //
    // res.json({
    //     success: true,
    //     data: {
    //         id: userId,
    //         email
    //     }
    // });
};