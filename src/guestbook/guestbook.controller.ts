import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GuestbookService } from './guestbook.service';
import { CreateGuestbookDto } from './dto/create-guestbook.dto';
import { UpdateGuestbookDto } from './dto/update-guestbook.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('guestbook')
export class GuestbookController {
  constructor(private readonly guestbookService: GuestbookService) {}

  @ApiOperation({ summary: '방명록 생성' })
  @Post()
  create(@Body() createGuestbookDto: CreateGuestbookDto) {
    return this.guestbookService.create(createGuestbookDto);
  }

  @ApiOperation({ summary: '방명록 조회' })
  @Get(':themeId')
  findAll(@Param('themeId') themeId: string) {
    return this.guestbookService.findAll(+themeId);
  }

  @ApiOperation({ summary: '방명록 상세 조회' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.guestbookService.findOne(+id);
  }
}
