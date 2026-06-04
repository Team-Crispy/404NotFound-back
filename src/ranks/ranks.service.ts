import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRankDto } from './dto/create-rank.dto';
import { Rank } from './entities/rank.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Theme } from '@/themes/entities/theme.entity';

@Injectable()
export class RanksService {
  constructor(
    @InjectRepository(Rank) private readonly rankRepository: Repository<Rank>,
    @InjectRepository(Theme) private readonly themeRepository: Repository<Theme>,
  ) { }

  async create(createRankDto: CreateRankDto) {
    const { theme_id, ...rankData } = createRankDto;
    const theme = await this.themeRepository.findOne({ where: { id: theme_id } });

    if (!theme) {
      throw new NotFoundException(`ID ${theme_id} 테마를 찾을 수 없습니다`);
    }

    const rank = this.rankRepository.create({
      ...rankData,
      theme,
    });
    const savedRank = await this.rankRepository.save(rank);
    // 전체 유저의 순위를 매기는 서브쿼리
    const subQuery = this.rankRepository
      .createQueryBuilder('sub')
      .select('sub.id', 'id')
      .addSelect('sub.user_name', 'user_name')
      .addSelect('sub.clear_time', 'clear_time')
      .addSelect('sub.hint_count', 'hint_count')
      .addSelect('sub.createdAt', 'createdAt')
      .addSelect('RANK() OVER (ORDER BY sub.clear_time ASC, sub.hint_count ASC, sub.createdAt ASC)', 'rankNum');

    // 서브쿼리를 이용해 현재 저장된 랭크의 순위를 가져오는 쿼리
    const rankResult = await this.rankRepository.manager
      .createQueryBuilder()
      .select('derived.id', 'id')
      .addSelect('derived.user_name', 'user_name')
      .addSelect('derived.rankNum', 'rank')
      .from(`(${subQuery.getQuery()})`, 'derived') 
      .where('derived.id = :id', { id: savedRank.id })
      .setParameters(subQuery.getParameters())
      .getRawOne();

    return { id: savedRank.id, rank: rankResult.rank, user_name: rankResult.user_name };
  }

  async findRanksByTheme(themeId: number) {
    const ranks = await this.rankRepository.find({
      select: ['id', 'user_name', 'clear_time', 'hint_count', 'ending_type', 'createdAt'],
      where: { theme: { id: themeId } },
      order: { clear_time: 'ASC', hint_count: 'ASC', createdAt: 'ASC' },
      take: 50,
    });

    return ranks;
  }

  async findOne(id: number) {
    return await this.rankRepository.findOne({ select: ['id', 'user_name', 'clear_time', 'hint_count', 'ending_type'], where: { id } });
  }
}
