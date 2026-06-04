import { Injectable } from '@nestjs/common';
import { CreateGuestbookDto } from './dto/create-guestbook.dto';
import { UpdateGuestbookDto } from './dto/update-guestbook.dto';

@Injectable()
export class GuestbookService {

  findAll() {
    return `This action returns all guestbook`;
  }

  findOne(id: number) {
    return `This action returns a #${id} guestbook`;
  }
}
