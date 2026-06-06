import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ThemesService } from './themes.service';
import { CreateThemeDto } from './dto/create-theme.dto';
import { ApiOperation } from '@nestjs/swagger';
import { CreatePuzzleDto } from './dto/create-puzzle.dto';

@Controller('themes')
export class ThemesController {
  constructor(private readonly themesService: ThemesService) {}

  @ApiOperation({ summary: '테마 목록 조회' })
  @Get()
  findAll() {
    return this.themesService.findAll();
  }

  @ApiOperation({ summary: '테마 상세 조회' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.themesService.findOne(+id);
  }

  @ApiOperation({ summary: '테마 생성' })
  @Post()
  create(@Body() createThemeDto: CreateThemeDto) {
    return this.themesService.create(createThemeDto);
  }

  @ApiOperation({ summary: '선택한 테마의 문제 추가' })
  @Post('add-puzzle')
  addPuzzle(@Body() createPuzzleDto: CreatePuzzleDto) {
    return this.themesService.addPuzzle(createPuzzleDto);
  }
}
