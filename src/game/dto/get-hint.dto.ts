import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class GetHintDto {
    @ApiProperty({ example: '1', description: '테마 ID' })
    @IsNotEmpty()
    @IsNumber()
    theme_id!: number;

    @ApiProperty({ example: '0', description: '문제 ID' })
    @IsNotEmpty()
    @IsNumber()
    puzzle_id!: number;

    @ApiProperty({ example: '0', description: '힌트 단계' })
    @IsNotEmpty()
    @IsNumber()
    hint_step!: number;

    @ApiProperty({ example: '{}', description: '게임 진행 상황' })
    progress!: object;
}
