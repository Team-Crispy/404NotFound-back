import { Injectable } from '@nestjs/common';
import { CreateGuestbookDto } from './dto/create-guestbook.dto';
import { UpdateGuestbookDto } from './dto/update-guestbook.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Guestbook } from './entities/guestbook.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GuestbookService {
  constructor(@InjectRepository(Guestbook) private readonly guestbookRepository: Repository<Guestbook>) {}

  async create(createGuestbookDto: CreateGuestbookDto) {
    const guestbook = this.guestbookRepository.create(createGuestbookDto);
    await this.guestbookRepository.save(guestbook);
    return { id : guestbook.id };
  }

  async findAll(themeId: number) {
    return await this.guestbookRepository.find(
      { select: ['id', 'user_name', 'createdAt', 'message'], where: { theme: { id: themeId } } });
  }

  async findOne(id: number) {
    return await this.guestbookRepository.findOne({ select: ['id', 'user_name', 'createdAt', 'message'], where: { id } });
  }
}
