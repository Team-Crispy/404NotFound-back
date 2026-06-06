import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Theme } from './entities/theme.entity';
import { Repository } from 'typeorm';
import { CreateThemeDto } from './dto/create-theme.dto';
import { ThemePuzzle } from './entities/theme_puzzle.entity';
import { CreatePuzzleDto } from './dto/create-puzzle.dto';
import { ThemeAnswer } from './entities/theme_answer.entity';
import { ThemeHint } from './entities/theme_hint.entity';

@Injectable()
export class ThemesService {
  constructor(@InjectRepository(Theme) private readonly themeRepository: Repository<Theme>,
              @InjectRepository(ThemePuzzle) private readonly themePuzzleRepository: Repository<ThemePuzzle>,
              @InjectRepository(ThemeHint) private readonly themeHintRepository: Repository<ThemeHint>,
              @InjectRepository(ThemeAnswer) private readonly themeAnswerRepository: Repository<ThemeAnswer>
) {}

  async findAll() {
    return await this.themeRepository.find({
      select: ['id', 'title', 'genre', 'thumbnail_url', 'difficulty', 'time_limit', 'is_locked'],
    });
  }

  async findOne(id: number) {
    const theme = await this.themeRepository.findOne({
      select: ['id', 'title', 'genre', 'thumbnail_url', 'difficulty', 'time_limit', 'is_locked'],
      where: { id }
    });
    return { theme : theme, scenes: [], objects: [], items: [] };
  }

  async create(createThemeDto: CreateThemeDto) {
    const theme = this.themeRepository.create(createThemeDto);
    await this.themeRepository.save(theme);
    return { id: theme.id };
  }

  async addPuzzle(createPuzzleDto: CreatePuzzleDto) {
    const theme = await this.themeRepository.findOne({ where: { id: createPuzzleDto.theme_id } });
    if (!theme) {
      throw new Error(`ID ${createPuzzleDto.theme_id} 테마를 찾을 수 없습니다`);
    } 

    const puzzle = this.themePuzzleRepository.create({
      theme,
      sequence: createPuzzleDto.sequence,
    });
    await this.themePuzzleRepository.save(puzzle);
    const puzzleId = puzzle.id;

    const hint = this.themeHintRepository.create({
      theme,
      themePuzzle: puzzle,
      content: createPuzzleDto.hint_content,
      step: createPuzzleDto.hint_step,
      progress_required: createPuzzleDto.progress_required,
    });
    await this.themeHintRepository.save(hint);

    const answer = this.themeAnswerRepository.create({
      theme,
      themePuzzle: puzzle,
      answer_value: createPuzzleDto.answer_value,
      progress_after: createPuzzleDto.progress_after,
    });
    await this.themeAnswerRepository.save(answer);
    return { theme_id: theme.id, puzzle_id: puzzleId, hint_id: hint.id, answer_id: answer.id };
  }
}
