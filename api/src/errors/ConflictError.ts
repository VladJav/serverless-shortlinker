import {CustomAPIError} from "./CustomAPIError.js";

export class ConflictError extends CustomAPIError{
    constructor(msg: string) {
        super(msg, 409);
    }
}