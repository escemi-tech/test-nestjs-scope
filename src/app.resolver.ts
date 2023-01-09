import { Field, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { AppService } from './app.service';

@ObjectType()
export class AuthorizationHeader {
  @Field()
  Authorization: string;
}

@Resolver()
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @Query(() => AuthorizationHeader)
  authorizationHeader(): { Authorization: string } {
    return {
      Authorization: this.appService.getAuthorizationHeader(),
    };
  }
}
