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
    const { theme_id, ...guestbookData } = createGuestbookDto;
    const theme = await this.themeRepository.findOne({ where: { id: theme_id } });

    if (!theme) {
      throw new NotFoundException(`ID ${theme_id} 테마를 찾을 수 없습니다`);
    }

    const guestbook = this.guestbookRepository.create({
      ...guestbookData,
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
        select: ['id', 'user_name', 'createdAt', 'message'],
        where: { theme: { id: themeId } },
        take: 50,
        order: { createdAt: 'DESC' },
      });
  }

  async findOne(id: number) {
    const guestbook = await this.guestbookRepository.findOne({ select: ['id', 'user_name', 'createdAt', 'message'], where: { id } });

    if (!guestbook) {
      throw new NotFoundException(`ID ${id} 방명록을 찾을 수 없습니다`);
    }

    return guestbook;
  }
}
