import { IsBoolean, IsDate, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "node_modules/@nestjs/swagger/dist";

export class CreatePuzzleDto {
    // 퍼즐이 속한 테마 ID
    @ApiProperty({ description: '테마 ID', example: 1 })
    @IsInt()
    @IsNotEmpty()
    theme_id!: number;

    // 퍼즐 단계
    @ApiProperty({ description: '퍼즐 단계', example: 1 })
    @IsInt()
    @IsNotEmpty()
    sequence!: number;

    // 퍼즐 힌트 내용
    @ApiProperty({ description: '퍼즐 힌트', example: '첫 번째 힌트입니다.' })
    @IsString()
    @IsNotEmpty()
    hint_content!: string;

    // 힌트 공개를 위한 진행도
    @ApiProperty({ description: '힌트 공개를 위한 진행도', example: 0.5 })
    @IsNumber()
    @IsOptional()
    progress_required!: number;

    // 퍼즐 정답 내용
    @ApiProperty({ description: '퍼즐 정답', example: '정답입니다.' })
    @IsString()
    @IsNotEmpty()
    answer_value!: string;

    // 정답 제출 시 진행도
    @ApiProperty({ description: '정답 제출 시 진행도', example: 0.5 })
    @IsNumber()
    @IsOptional()
    progress_after!: number;
}