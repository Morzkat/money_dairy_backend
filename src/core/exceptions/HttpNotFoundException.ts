import { HttpException } from "@nestjs/common";

export class HttpNotFoundException extends HttpException {

    statusCode: number;

    constructor(messsage: string) {
        super(messsage, 404);
        this.statusCode = 404;
    }
}