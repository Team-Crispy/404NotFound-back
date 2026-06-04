import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Theme } from './entities/theme.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ThemesService {
  constructor(@InjectRepository(Theme) private readonly themeRepository: Repository<Theme>) {}

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
}
