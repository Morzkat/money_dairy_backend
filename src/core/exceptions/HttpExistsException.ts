import { HttpException } from '@nestjs/common';

export class HttpExistsException extends HttpException {
    statusCode: number;

    constructor(messsage: string) {
        super(messsage, 403);
        this.statusCode = 403;
    }
}
