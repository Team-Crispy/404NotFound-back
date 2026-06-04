import { PartialType } from '@nestjs/swagger';
import { CreateGuestbookDto } from './create-guestbook.dto';

export class UpdateGuestbookDto extends PartialType(CreateGuestbookDto) {}
