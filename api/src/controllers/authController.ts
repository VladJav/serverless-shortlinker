import {NextFunction, Request, Response} from "express";
import {compare} from "bcryptjs";
import {sign} from "jsonwebtoken";
import {BadRequestError, ConflictError, NotFoundError, UnauthenticatedError} from "../errors";
import {UserModel} from "../models/UserModel";
import {TokenModel} from "../models/TokenModel";

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userAgent = req.headers['user-agent'] || '';
        const { email, password } = req.body;
        if (!email || !password || !email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
            throw new BadRequestError('Please provide correct data');
        }

        const users = await UserModel.findByEmail(email);
        if(users?.length !== 0){
            throw new ConflictError('User with this email already exists');
        }

        const { id } = await UserModel.create(email, password);
        const accessToken = sign({userId: id, email}, process.env.JWT_ACCESS_SECRET,  { expiresIn: process.env.JWT_ACCESS_TTL || '60m'});
        const refreshToken = sign({userId: id, email}, process.env.JWT_REFRESH_SECRET);

        await TokenModel.save(id, userAgent, refreshToken);
        res.json({
            users,
            success: true,
            data: {
                id,
                accessToken,
                refreshToken
            }
        });
    }
    catch (e) {
        next(e);
    }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userAgent = req.headers['user-agent'];
        const { email, password } = req.body;
        if (!email || !password || !userAgent) {
            throw new BadRequestError('Please provide correct data');
        }

        const findResult = await UserModel.findByEmail(email);
        if(findResult?.length! === 0 || !findResult){
            throw new NotFoundError(`User with email: ${email} does not exists`);
        }
        const user = findResult[0];

        const isPasswordCorrect = await compare(password, user.password);
        if (!isPasswordCorrect) {
            throw new UnauthenticatedError('Please provide correct credentials');
        }

        const accessToken = sign({userId: user.id, email}, process.env.JWT_ACCESS_SECRET,  { expiresIn: process.env.JWT_ACCESS_TTL || '60m'});
        const refreshToken = sign({userId: user.id, email}, process.env.JWT_REFRESH_SECRET);

        await TokenModel.save(user.id, userAgent, refreshToken);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
        });
        res.json({
            success: true,
            data: {
                id: user.id,
                accessToken,
                refreshToken
            }
        });
    }
    catch (e) {
        next(e);
    }
};