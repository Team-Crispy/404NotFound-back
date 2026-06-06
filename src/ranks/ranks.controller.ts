import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RanksService } from './ranks.service';
import { CreateRankDto } from './dto/create-rank.dto';
import { UpdateRankDto } from './dto/update-rank.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('ranks')
export class RanksController {
  constructor(private readonly ranksService: RanksService) {}

  @ApiOperation({ summary: '랭킹 생성' })
  @Post()
  create(@Body() createRankDto: CreateRankDto) {
    return this.ranksService.create(createRankDto);
  }

  @ApiOperation({ summary: '테마별 랭킹 조회' })
  @Get(':themeId')
  findRanksByTheme(@Param('themeId') themeId: number) {
    return this.ranksService.findRanksByTheme(themeId);
  }
  
  @ApiOperation({ summary: '랭킹 상세 조회' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ranksService.findOne(+id);
  }
}
