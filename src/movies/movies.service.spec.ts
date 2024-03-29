import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);

    // 매번 movie를 생성하고 있으므로 beforeEach에 써서 중복을 최소화 할 수 도 있음
    // service.create({
    //   title: "엘리멘탈",
    //   genres: ["애니메이션/코미디"],
    //   year: 2023,
    // });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("getAll()", () => {
    it("should return an array", () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe("getOne()", () => {
    it("should return a movie", () => {
      service.create({
        title: "엘리멘탈",
        genres: ["애니메이션/코미디"],
        year: 2023,
      });

      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it("should throw 404 error", () => {
      try{
        service.getOne(999);
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual("Movie with ID 999 not found.");
      }
    });
  });

  describe("deleteOne()", () => {
    it("deletes a movie", () => {
      service.create({
        title: "엘리멘탈",
        genres: ["애니메이션/코미디"],
        year: 2023,
      });

      const allMovies = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;

      expect(afterDelete).toBeLessThan(allMovies);
    });

    it("should return a 404", () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe("create()", () => {
    it("should create a movie", () => {
      const beforeCreate = service.getAll().length;

      service.create({
        title: "엘리멘탈",
        genres: ["애니메이션/코미디"],
        year: 2023,
      });

      const afterCreate = service.getAll().length;

      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe("update()", () => {
    it("should update a movie", () => {
      service.create({
        title: "엘리멘탈",
        genres: ["애니메이션/코미디"],
        year: 2023,
      });

      service.update(1, { title: "엘리멘탈2" });

      const movie = service.getOne(1);
      expect(movie.title).toEqual("엘리멘탈2");
    });

    it("should throw a NotFoundException", () => {
      try {
        service.update(999, { title: "엘리멘탈2" });
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
