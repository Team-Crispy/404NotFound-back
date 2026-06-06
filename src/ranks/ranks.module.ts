import { Module } from '@nestjs/common';
import { RanksService } from './ranks.service';
import { RanksController } from './ranks.controller';
import { Rank } from './entities/rank.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Theme } from '@/themes/entities/theme.entity';
import { Guestbook } from '@/guestbook/entities/guestbook.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rank, Theme, Guestbook])],
  controllers: [RanksController],
  providers: [RanksService],
})
export class RanksModule {}
