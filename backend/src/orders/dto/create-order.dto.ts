import { MinLength } from 'class-validator';

import { PaymentCardNumberValidator } from '@src/custom-validators';

export class CreateOrderDto {
  @MinLength(5)
  address: string;

  @PaymentCardNumberValidator()
  paymentCardNumber: number;
}
