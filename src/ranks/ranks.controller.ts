import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RanksService } from './ranks.service';
import { CreateRankDto } from './dto/create-rank.dto';
import { UpdateRankDto } from './dto/update-rank.dto';

@Controller('ranks')
export class RanksController {
  constructor(private readonly ranksService: RanksService) {}

  @Post()
  create(@Body() createRankDto: CreateRankDto) {
    return this.ranksService.create(createRankDto);
  }

  @Get(':themeId')
  findRanksByTheme(@Param('themeId') themeId: number) {
    return this.ranksService.findRanksByTheme(themeId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ranksService.findOne(+id);
  }
}
