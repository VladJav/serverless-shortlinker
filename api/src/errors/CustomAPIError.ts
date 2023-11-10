export class CustomAPIError extends Error {
    private _statusCode: number;

    constructor(msg: string, statusCode: number) {
        super(msg);
        this._statusCode = statusCode;
    }


    get statusCode(): number {
        return this._statusCode;
    }

    set statusCode(value: number) {
        this._statusCode = value;
    }
}