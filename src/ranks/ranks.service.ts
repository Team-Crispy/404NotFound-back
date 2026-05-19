import { Injectable } from '@nestjs/common';
import { CreateRankDto } from './dto/create-rank.dto';
import { UpdateRankDto } from './dto/update-rank.dto';

@Injectable()
export class RanksService {
  create(createRankDto: CreateRankDto) {
    return 'This action adds a new rank';
  }
}
