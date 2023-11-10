import {CustomAPIError} from "./CustomAPIError.js";

export class NotFoundError extends CustomAPIError {
    constructor(msg: string) {
        super(msg, 404);
    }

}