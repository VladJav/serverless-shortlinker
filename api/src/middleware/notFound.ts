import {NotFoundError} from "../errors";
import {NextFunction, Request, Response} from "express";

export const notFoundMiddleware = (req: Request, res: Response, next: NextFunction) => {
    next(new NotFoundError('Route does not exists'));
}