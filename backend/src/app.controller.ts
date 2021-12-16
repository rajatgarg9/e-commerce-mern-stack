import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { AppService } from './app.service';

import { DisableAuthDecorator } from '@src/auth/decorators/disable-auth.decorator';

@Controller({
  version: VERSION_NEUTRAL,
})
export class AppController {
  constructor(private readonly appService: AppService) {}

  @DisableAuthDecorator()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
