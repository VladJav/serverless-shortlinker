import {NextFunction, Request, Response} from "express";
import {compare} from "bcryptjs";
import {JwtPayload, sign, verify} from "jsonwebtoken";
import {BadRequestError, ConflictError, NotFoundError, UnauthenticatedError} from "../errors";
import {UserModel} from "../models/UserModel";
import {TokenModel} from "../models/TokenModel";
import {sendVerificationMail} from "../utils/sendVerificationMail";

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const protocol = req.protocol;
        const host = req.headers.host;
        const requestUrl = `${protocol}://${host}/${process.env.STAGE}`

        const { email, password } = req.body;
        if (!email || !password || !email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
            next(new BadRequestError('Please provide correct data'));
            return;
        }

        const findResult = await UserModel.findByEmail(email);
        if(findResult.length){
            next(new ConflictError('User with this email already exists'));
            return;
        }

        const activationCode = sign({email}, process.env.JWT_ACCESS_SECRET,  {expiresIn: '30m'});

        await UserModel.create(email, password, activationCode);
        await sendVerificationMail(email, activationCode, requestUrl);

        res.status(201).json({
            success: true,
            message: 'Success! Check your email to verify account'
        });
    }
    catch (e) {
        next(e);
    }
};

export const activateUser = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { token } = req.params;

        const { email } = verify(token, process.env.JWT_ACCESS_SECRET) as JwtPayload;
        const findResult = await UserModel.findByEmail(email);
        if(!findResult.length){
            next(new UnauthenticatedError('Bad Token'));
            return;
        }
        const [user] = findResult;

        await UserModel.updateActivationStatus(user.id, true, '');

        res.json({
            success: true,
            message: 'Email verified. Now you can login to start working with api'
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
            next(new BadRequestError('Please provide correct data'));
            return;
        }

        const findResult = await UserModel.findByEmail(email);
        if(!findResult.length){
            next(new NotFoundError(`User with email: ${email} does not exists`));
            return;
        }
        const user = findResult[0];

        const isPasswordCorrect = await compare(password, user.password);
        if (!isPasswordCorrect) {
            next(new UnauthenticatedError('Please provide correct credentials'));
            return;
        }
        if (!user.isActivated) {
            next(new UnauthenticatedError('Please verify your email'));
            return;
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