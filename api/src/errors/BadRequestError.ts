import {CustomAPIError} from "./CustomAPIError.js";

export class BadRequestError extends CustomAPIError {
    constructor(msg: string) {
        super(msg, 400);
    }

}