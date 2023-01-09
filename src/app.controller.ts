import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/authorization-header')
  getRequestId(): { Authorization: string } {
    return {
      Authorization: this.appService.getAuthorizationHeader(),
    };
  }
}
