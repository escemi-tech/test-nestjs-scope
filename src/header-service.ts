import { Inject, Injectable, Scope } from '@nestjs/common';
import { NJRS_REQUEST } from 'nj-request-scope';
import { Request } from 'express';

@Injectable()
export class HeaderService {
  constructor(@Inject(NJRS_REQUEST) private readonly request: Request) {}

  getAuthorization(): string {
    return this.request.headers.authorization ?? '';
  }
}
