import { Module } from '@nestjs/common';
import { ThemesService } from './themes.service';
import { ThemesController } from './themes.controller';
import { Theme } from './entities/theme.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThemeAnswer } from './entities/theme_answer.entity';
import { ThemeHint } from './entities/theme_hint.entity';
import { ThemePuzzle } from './entities/theme_puzzle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Theme, ThemeHint, ThemeAnswer, ThemePuzzle])],
  controllers: [ThemesController],
  providers: [ThemesService],
})
export class ThemesModule {}
