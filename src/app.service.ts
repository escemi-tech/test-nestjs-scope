import { Injectable } from '@nestjs/common';
import { HeaderService } from './header-service';

@Injectable()
export class AppService {
  constructor(private readonly headerService: HeaderService) {
    this.initialize();
  }

  initialize(): void {
    // Workaround for asserting the singleton behavior of the service
  }

  getAuthorizationHeader(): string {
    return this.headerService.getAuthorization();
  }
}
