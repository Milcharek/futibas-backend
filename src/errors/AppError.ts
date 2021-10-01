import { ErrorCode } from "../config/constants";

class Error {
    public readonly message: string;

    public readonly statusCode: number;

    constructor(message: string, statusCode = ErrorCode.BadRequest) {
        this.message = message;
        this.statusCode = statusCode;
    }
}

export default Error;