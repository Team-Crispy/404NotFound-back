import { Injectable } from '@nestjs/common';
import { GetHintDto } from './dto/get-hint.dto';
import { SubmitAnswerDto } from './dto/submit-answer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ThemeHint } from '@/themes/entities/theme_hint.entity';
import { ThemeAnswer } from '@/themes/entities/theme_answer.entity';
import { NotFoundException } from '@nestjs/common';
import { GetAnswerDto } from './dto/get-answer.dto';

@Injectable()
export class GameService {
    constructor(@InjectRepository(ThemeHint) private readonly hintRepository: Repository<ThemeHint>,
                @InjectRepository(ThemeAnswer) private readonly answerRepository: Repository<ThemeAnswer>) {}

    async getHint(getHintDto: GetHintDto) {
        const { theme_id, sequence, progress } = getHintDto;
        const hint = await this.hintRepository.find({
            select: ['id', 'content', 'progress_required'],
            where: { theme: { id: theme_id }, themePuzzle: { sequence: sequence }},
        });
        // console.log('찾은 힌트:', hint);

        if (!hint || hint.length === 0) {
            throw this.NotFoundPuzzleException(theme_id, sequence);
        }

        const availableHints = hint.filter(h => h.progress_required <= progress);

        if (availableHints.length === 0) {
            throw new NotFoundException(`힌트를 얻기 위한 진행 상황이 부족합니다. 현재 진행 상황: ${progress}`);
        }
        return { content: availableHints[0].content };
    }

    async submitAnswer(submitAnswerDto: SubmitAnswerDto) {
        const { theme_id, sequence } = submitAnswerDto;
        const answer = await this.answerRepository.findOne({
            select: ['id', 'answer_value', 'progress_after', 'themePuzzle'],
            where: { theme: { id: theme_id }, themePuzzle: { sequence: sequence }},
            relations: ['themePuzzle'],
        });
        // console.log('찾은 답안:', answer);
        if (!answer) {
            throw this.NotFoundPuzzleException(theme_id, sequence);
        }
        const isCorrect = answer?.answer_value === submitAnswerDto.answer;
        return { isCorrect, progress_after: isCorrect ? answer?.progress_after : null };
    }

    async getAnswer(getAnswerDto: GetAnswerDto) {
        const { theme_id, sequence } = getAnswerDto;
        const answer = await this.answerRepository.findOne({
            select: ['id', 'answer_value', 'progress_after'],
            where: { theme: { id: theme_id }, themePuzzle: { sequence: sequence }},
        });
        if (!answer) {
            throw this.NotFoundPuzzleException(theme_id, sequence);
        }
        return { answer: answer?.answer_value, progress_after: answer?.progress_after };
    }

    NotFoundPuzzleException(theme_id: number, sequence: number) {
        return new NotFoundException(`ID ${theme_id} 테마의 ${sequence} 단계 문제를 찾을 수 없습니다`);
    }
}
