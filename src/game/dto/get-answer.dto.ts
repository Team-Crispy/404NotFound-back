import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetAnswerDto {
    @ApiProperty({ example: '1', description: '테마 ID' })
    @IsNotEmpty()
    @IsNumber()
    theme_id!: number;

    @ApiProperty({ example: '0', description: '문제 단계' })
    @IsNotEmpty()
    @IsNumber()
    sequence!: number;

}