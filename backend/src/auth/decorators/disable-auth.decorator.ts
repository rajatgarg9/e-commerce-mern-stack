import { SetMetadata } from '@nestjs/common';

export function DisableAuthDecorator() {
  return SetMetadata('isAuthDisable', true);
}
