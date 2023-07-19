import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import * as pactum from 'pactum';
import { PrismaService } from '../src/prisma/prisma.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );

    await app.init();
    await app.listen(3335);

    prisma = app.get(PrismaService);

    await prisma.cleanDb();

    pactum.request.setBaseUrl('http://localhost:3335');
  }, 100000);

  afterAll(async () => {
    app.close();
  });

  /////////////////////////////////////////
  // AUTH /////////////////////////////////
  /////////////////////////////////////////

  describe('Auth', () => {
    const authDto = {
      email: 'miguel@test.com',
      password: '123',
    };
    // Sign-up
    it('Should register - 201', () => {
      return pactum
        .spec()
        .post('/auth/register')
        .withBody(authDto)
        .expectStatus(201);
    });

    // Login
    it('Should login - 200', () => {
      return pactum
        .spec()
        .post('/auth/login')
        .withBody(authDto)
        .expectStatus(200)
        .stores('userAt', 'access_token');
    });
  });

  /////////////////////////////////////////
  // USER /////////////////////////////////
  /////////////////////////////////////////

  describe('User', () => {
    // Should get own user
    it('Should get current user - 200', () => {
      return pactum
        .spec()
        .get('/user/me')
        .withHeaders({
          Authorization: 'Bearer $S{userAt}',
        })
        .expectStatus(200);
    });
  });

  /////////////////////////////////////////
  // TASK /////////////////////////////////
  /////////////////////////////////////////
});
