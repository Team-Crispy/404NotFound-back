import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GameService } from './game.service';
import { GetHintDto } from './dto/get-hint.dto';
import { SubmitAnswerDto } from './dto/submit-answer.dto';
import { GetAnswerDto } from './dto/get-answer.dto';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}
  
  @Post('/hint')
  getHint(@Body() getHintDto: GetHintDto) {
    return this.gameService.getHint(getHintDto);
  }

  @Post('/verify')
  submitAnswer(@Body() submitAnswerDto: SubmitAnswerDto) {
    return this.gameService.submitAnswer(submitAnswerDto);
  }

  @Post('/answer')
  getAnswer(@Body() getAnswerDto: GetAnswerDto) {
    return this.gameService.getAnswer(getAnswerDto);
  }
}
