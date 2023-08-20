import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    //main.ts에 있는 걸 동일하게 pipe를 통해 사용해줘야 transfrom과 같은 동작들이 정상적으로 동작함(테스트에서도 실제 어플리케이션의 환경을 그대로 적용해줘야함)
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,    
      forbidNonWhitelisted: true,
      transform: true,
    }));
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to my Movie API');
  });

  describe("/movies", () => {
    it("GET", () => {
      return request(app.getHttpServer())
        .get("/movies")
        .expect(200)
        .expect([]);
    });
  
    it("POST", () => {
      return request(app.getHttpServer())
        .post("/movies")
        .send({
          title: "엘리멘탈",
          genres: ["애니메이션/코미디"],
          year: 2023,
        })
        .expect(201);
    });

    it("DELETE", () => {
      return request(app.getHttpServer())
        .delete("/movies")
        .expect(404);
    });
  });

  describe("/movies/:id", () => {
    it("GET 200", () => {
      return request(app.getHttpServer())
        .get("/movies/1")
        .expect(200);
    });

    it("GET 404", () => {
      return request(app.getHttpServer())
        .get("/movies/999")
        .expect(404);
    });

    it.todo("DELETE");

    it.todo("PATCH");
  });
});
