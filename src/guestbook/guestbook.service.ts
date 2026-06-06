import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGuestbookDto } from './dto/create-guestbook.dto';
import { UpdateGuestbookDto } from './dto/update-guestbook.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Guestbook } from './entities/guestbook.entity';
import { Repository } from 'typeorm';
import { Theme } from '@/themes/entities/theme.entity';

@Injectable()
export class GuestbookService {
  constructor(@InjectRepository(Guestbook) private readonly guestbookRepository: Repository<Guestbook>,
    @InjectRepository(Theme) private readonly themeRepository: Repository<Theme>,) { }

  async create(createGuestbookDto: CreateGuestbookDto) {
    const { theme_id, rank_id, ...guestbookData } = createGuestbookDto;
    const theme = await this.themeRepository.findOne({ where: { id: theme_id } });

    if (!theme) {
      throw new NotFoundException(`ID ${theme_id} 테마를 찾을 수 없습니다`);
    }

    if (!rank_id) {
      throw new NotFoundException(`랭킹 ID가 제공되지 않았습니다`);
    }

    const guestbook = this.guestbookRepository.create({
      ...guestbookData,
      rank: { id: rank_id },
      theme,
    });
    await this.guestbookRepository.save(guestbook);
    return { id: guestbook.id };
  }

  async findAll(themeId: number) {
    if (!await this.themeRepository.findOne({ where: { id: themeId } })) {
      throw new NotFoundException(`ID ${themeId} 테마를 찾을 수 없습니다`);
    }

    return await this.guestbookRepository.find(
      {
        select: ['id', 'createdAt', 'message'],
        where: { theme: { id: themeId } },
        take: 50,
        order: { createdAt: 'DESC' },
      });
  }

  async findOne(id: number) {
    return await this.guestbookRepository.findOne({ select: ['id', 'createdAt', 'message'], where: { id } });
  }
}
