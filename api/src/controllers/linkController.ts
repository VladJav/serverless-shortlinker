import {NextFunction, Request, Response} from "express";
import {BadRequestError, NotFoundError} from "../errors";
import {isValidUrl} from "../utils/isValidUrl";
import {LinkModel} from "../models/LinkModel";
import {DAY} from "../constants/date";

export const createLink = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { lifetime, link } = req.body;
        const { userId } = req.user;
        const protocol = req.protocol;
        const host = req.headers.host;

        if(!lifetime || !link || !isValidUrl(link)) {
            throw new BadRequestError('Provide correct data');
        }

        //
        let expiresIn = null;
        let isOneTime = false;
        switch (lifetime){
            case '1d':
                expiresIn = new Date(Date.now() + DAY).toISOString();
                break;
            case '3d':
                expiresIn = new Date(Date.now() + DAY * 3).toISOString();
                break;
            case '7d':
                expiresIn = new Date(Date.now() +DAY * 7).toISOString();
                break
            case '1t':
                expiresIn = new Date(Date.now() + DAY * 30).toISOString();
                isOneTime = true;
                break;
            default:
                throw new BadRequestError('Provide correct lifetime data');
        }
        let shortLink = Math.random().toString(36).slice(2, 8);
        let isPathExists = await LinkModel.findByShortLink(shortLink);

        while(isPathExists?.length !== 0){
            shortLink = Math.random().toString(36).slice(2, 8);
            isPathExists = await LinkModel.findByShortLink(shortLink);
        }

        await LinkModel.create({
            expiresIn,
            fullLink: link,
            isOneTime,
            shortLink,
            userId
        });

        res.status(201).json({
            link: `${protocol}://${host}/${shortLink}`
        });
    }
    catch (e) {
        next(e);
    }
};

export const getLinks =  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.user;
    const links = await LinkModel.findByUserId(userId);
    res.json(links);
};

export const redirectLink = async (req: Request, res: Response) => {
    const { path } = req.params;

    let findResult = await LinkModel.findByShortLink(path);
    if(!findResult?.length){
        throw new NotFoundError('Path does not exists');
    }
    const [ link ] = findResult;

    await LinkModel.updateVisitedTimes(link.id);
    res.redirect(link.fullLink);
};