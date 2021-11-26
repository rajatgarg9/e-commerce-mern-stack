import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { MongoError } from 'mongodb';
import { Error as MongooseError } from 'mongoose';

const ValidationError = MongooseError.ValidationError;
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let messages: any = exception.message;

    if (exception instanceof HttpException) {
      status = exception.getStatus();

      messages = exception.getResponse();

      if (typeof messages === 'object') {
        messages = messages.message;
      }
    } else if (
      exception instanceof MongoError ||
      exception instanceof ValidationError
    ) {
      status = HttpStatus.BAD_REQUEST;
      messages = exception.message;
    }

    messages = messages || 'An unknown error occurred';

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(messages);
    }

    response.status(status).json({
      messages,
    });
  }
}
