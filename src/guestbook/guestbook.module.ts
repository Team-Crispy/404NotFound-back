import { Module } from '@nestjs/common';
import { GuestbookService } from './guestbook.service';
import { GuestbookController } from './guestbook.controller';
import { Guestbook } from './entities/guestbook.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Theme } from '@/themes/entities/theme.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Guestbook, Theme])],
  controllers: [GuestbookController],
  providers: [GuestbookService],
})
export class GuestbookModule {}
