import {NextFunction, Request, Response} from "express";
import {compare} from "bcryptjs";
import {sign} from "jsonwebtoken";
import {BadRequestError, NotFoundError, UnauthenticatedError} from "../errors";
import {UserModel} from "../models/UserModel";


export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userModel = new UserModel();
        console.log('asd');
        const r = await userModel.create('Vlad', 'Jb');
        // const userAgent = req.headers['user-agent'];
        // const { email, password } = req.body;
        // if (!email || !password) {
        //     throw new BadRequestError('Please provide email and password');
        // }
        //
        // const userModel = new UserModel();
        // const tokenMode = new Token();
        //
        // const user = await userModel.findByEmail(email);
        // if(!user){
        //     throw new NotFoundError(`User with email: ${email} does not exists`);
        // }
        //
        // const isPasswordCorrect = await compare(password, user.password);
        // if (!isPasswordCorrect) {
        //     throw new UnauthenticatedError('Please provide correct credentials');
        // }
        //
        // const accessToken = sign({userId: user.id, email}, process.env.JWT_ACCESS_SECRET!, { expiresIn: process.env.JWT_ACCESS_TTL || '60m'});
        // const refreshToken = sign({userId: user.id, email}, process.env.JWT_REFRESH_SECRET!);
        //
        // await tokenMode.save({userId: user.id, refreshToken, userAgent});
        //
        // res.cookie('refreshToken', refreshToken, {
        //     httpOnly: true,
        // });
        // res.json({
        //     success: true,
        //     data: {
        //         id: user.id,
        //         accessToken,
        //         refreshToken
        //     }
        // });
        res.json(r);
    }
    catch (e) {
        next(e);
    }
};