import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { AppService } from './app.service';

describe('App E2E', () => {
  let app: INestApplication;
  let appServiceInitializeSpy: any;

  beforeEach(async () => {
    appServiceInitializeSpy = jest.spyOn(AppService.prototype, 'initialize');

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('GraphQL', () => {
    it('should return get Authorization header', async () => {
      const header1 = 'Bearer 123';
      const response1 = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `{
            authorizationHeader {
              Authorization
            }
          }`,
        })
        .set('Accept', 'application/json')
        .set('Authorization', header1)
        .expect(200);

      expect(response1.body?.data?.authorizationHeader.Authorization).toEqual(
        header1,
      );

      const header2 = 'Bearer 456';
      const response2 = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `{
            authorizationHeader {
              Authorization
            }
          }`,
        })
        .set('Accept', 'application/json')
        .set('Authorization', header2)
        .expect(200);

      expect(response2.body?.data?.authorizationHeader.Authorization).toEqual(
        header2,
      );

      expect(appServiceInitializeSpy).toBeCalledTimes(1);
    });
  });
});
