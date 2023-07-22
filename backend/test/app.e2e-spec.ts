import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import * as pactum from 'pactum';
import { PrismaService } from '../src/prisma/prisma.service';
import { UpdateUserDto } from '../src/user/dto/update-user.dto';

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

    // Should update user
    it('Should update user - 200', () => {
      const updateUserDto: UpdateUserDto = {
        firstName: 'miguel',
      };

      return pactum
        .spec()
        .patch('/user/update')
        .withHeaders({
          Authorization: 'Bearer $S{userAt}',
        })
        .withBody(updateUserDto)
        .expectStatus(200);
    });
  });

  /////////////////////////////////////////
  // TASK /////////////////////////////////
  /////////////////////////////////////////

  describe('Task', () => {
    const task = {
      title: 'Test task',
      status: 'todo',
    };

    // Create Task.
    it('Should create task - 201', () => {
      return pactum
        .spec()
        .post('/task/create')
        .withHeaders({
          Authorization: 'Bearer $S{userAt}',
        })
        .withBody(task)
        .expectStatus(201)
        .stores('taskId', 'id');
    });

    // List tasks.
    it('Should list all user tasks', () => {
      return pactum
        .spec()
        .get('/task/list')
        .withHeaders({ Authorization: 'Bearer $S{userAt}' })
        .expectStatus(200);
    });

    // Get task.
    it('Should get task with id 1', () => {
      return pactum
        .spec()
        .get('/task/get/$S{taskId}')
        .withHeaders({ Authorization: 'Bearer $S{userAt}' })
        .expectStatus(200);
    });

    // Update task.
    it('Should update task', () => {
      return pactum
        .spec()
        .patch('/task/update/$S{taskId}')
        .withHeaders({ Authorization: 'Bearer $S{userAt}' })
        .withBody(task)
        .expectStatus(200);
    });

    // Delete task.
    it('Should delete task with id 1', () => {
      return pactum
        .spec()
        .delete('/task/delete/$S{taskId}')
        .withHeaders({ Authorization: 'Bearer $S{userAt}' })
        .expectStatus(200);
    });
  });
});
