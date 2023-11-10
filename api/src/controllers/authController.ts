import {NextFunction, Request, Response} from "express";
import {compare} from "bcryptjs";
import {sign} from "jsonwebtoken";
import {BadRequestError, NotFoundError, UnauthenticatedError} from "../errors";
import {UserModel} from "../models/UserModel";


export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userModel = new UserModel();

        const userAgent = req.headers['user-agent'];
        const { email, password } = req.body;
        if (!email || !password) {
            throw new BadRequestError('Please provide email and password');
        }
        const r = await userModel.create('Vlad', 'Jb');
        res.json(r);
    }
    catch (e) {
        next(e);
    }
};