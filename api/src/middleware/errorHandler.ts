import {CustomAPIError} from "../errors";
import {NextFunction, Request, Response} from "express";

export const errorHandlerMiddleware = (err: CustomAPIError, req: Request, res: Response, next: NextFunction) => {
    res.status(err?.statusCode || 500).json({
        success: false,
        error: err.message || 'Something went wrong try again later',
    });
}