import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class SubmitAnswerDto {
    @ApiProperty({ example: '1', description: '테마 ID' })
    @IsNotEmpty()
    @IsNumber()
    theme_id!: number;

    @ApiProperty({ example: '0', description: '문제 단계' })
    @IsNotEmpty()
    @IsNumber()
    sequence!: number;

    @ApiProperty({ example: '1025', description: '제출한 답안' })
    @IsNotEmpty()
    answer!: string;
}