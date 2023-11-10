import {CustomAPIError} from "./CustomAPIError.js";

export class UnauthenticatedError extends CustomAPIError {
    constructor(msg: string) {
        super(msg, 401);
    }

}