import { Controller, Get, Param, Post, Delete, Patch, Body, Query } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
    
    @Get()
    getAll(){
        return "This will return all movies";
    }

    // search 부분이 getOne 보다 밑에 있으면 NestJS는 search를 id로 판단
    // Query는 Query Parameter를 받아올 때 사용 (예, /users?id=123)
    @Get("search")
    serach(@Query("year") searchingYear: string){
        return `We are searching for a movie made after ${searchingYear}`;
    }

    // Param은 Path Variable을 받아올 때 사용 (예, /users/123)
    @Get('/:id')
    getOne(@Param("id") movieId: string){
        return `This will return one movie with the id : ${movieId}`;
    }

    @Post()
    create(@Body() movieData){
        return movieData;
    }

    @Delete('/:id')
    remove(@Param('id') movieId: string){
        return `This will delete a movie with the id ${movieId}`;
    }
    
    @Patch('/:id')
    patch(@Param('id') movieId: string, @Body() updateData){
        return {
            updateMovie: movieId,
            ...updateData
        };
    }
}
