import { Controller, Get, Param, Post, Delete, Patch, Body } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {

    constructor(private readonly movieService: MoviesService){}
    
    @Get()
    getAll() : Movie[] {
        return this.movieService.getAll();
    }

    // search 부분이 getOne 보다 밑에 있으면 NestJS는 search를 id로 판단
    // Query는 Query Parameter를 받아올 때 사용 (예, /users?id=123)
    //@Get("search")
    //serach(@Query("year") searchingYear: string){
    //    return `We are searching for a movie made after ${searchingYear}`;
    //}

    // Param은 Path Variable을 받아올 때 사용 (예, /users/123)
    @Get('/:id')
    getOne(@Param("id") movieId: number) : Movie {
        console.log(typeof movieId);
        return this.movieService.getOne(movieId);
    }

    @Post()
    create(@Body() movieData: CreateMovieDTO){
        return this.movieService.create(movieData);
    }

    @Delete('/:id')
    remove(@Param('id') movieId: number){
        return this.movieService.deleteOne(movieId);
    }
    
    @Patch('/:id')
    patch(@Param('id') movieId: number, @Body() updateData: UpdateMovieDTO){
        return this.movieService.update(movieId, updateData);
    }
}
