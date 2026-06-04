import { Injectable } from '@nestjs/common';
import { GetHintDto } from './dto/get-hint.dto';
import { SubmitAnswerDto } from './dto/submit-answer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ThemeHint } from '@/themes/entities/theme_hint.entity';
import { ThemeAnswer } from '@/themes/entities/theme_answer.entity';

@Injectable()
export class GameService {
    constructor(@InjectRepository(ThemeHint) private readonly hintRepository: Repository<ThemeHint>,
                @InjectRepository(ThemeAnswer) private readonly answerRepository: Repository<ThemeAnswer>) {}

    async getHint(getHintDto: GetHintDto) {
        const { theme_id, hint_step, puzzle_id } = getHintDto;
        const hint = await this.hintRepository.findOne({
            select: ['id', 'content'],
            where: { theme: { id: theme_id }, themePuzzle: { id: puzzle_id }, step: hint_step + 1 },
        });
        return { content: hint?.content || '존재하지 않는 문제입니다.' };
    }

    async submitAnswer(submitAnswerDto: SubmitAnswerDto) {
        const { theme_id, puzzle_id } = submitAnswerDto;
        const answer = await this.answerRepository.findOne({
            select: ['id', 'answer_value'],
            where: { theme: { id: theme_id }, themePuzzle: { id: puzzle_id }},
        });
        const isCorrect = answer?.answer_value === submitAnswerDto.answer;
        return { isCorrect };
    }
}
