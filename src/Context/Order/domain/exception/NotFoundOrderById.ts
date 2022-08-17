import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundOrderById extends HttpException {
  constructor(orderId: string) {
    super(`Order not exist with ${orderId}`, HttpStatus.NOT_FOUND);
  }
}
