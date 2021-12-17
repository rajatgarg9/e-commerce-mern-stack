import { registerDecorator, ValidationOptions } from 'class-validator';

import { PAYMENT_CARD_NUMBER_INVALID } from '@src/utilities/message';

export function PaymentCardNumberValidator(
  property?: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'PaymentCardNumberValidator',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (typeof value !== 'number') {
            return false;
          }

          const stringValue = value.toString();

          if (stringValue.length !== 16) {
            return false;
          }
          return true;
        },
        defaultMessage() {
          return PAYMENT_CARD_NUMBER_INVALID;
        },
      },
    });
  };
}
