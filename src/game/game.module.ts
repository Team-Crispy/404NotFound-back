import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { ThemeHint } from '@/themes/entities/theme_hint.entity';
import { ThemeAnswer } from '@/themes/entities/theme_answer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ThemeHint, ThemeAnswer])],
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule {}
