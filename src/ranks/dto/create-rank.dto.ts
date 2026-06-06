import { ApiProperty } from "node_modules/@nestjs/swagger/dist";
import { IsNumber, IsNotEmpty, IsString } from "class-validator";

export class CreateRankDto {
    @ApiProperty({ example: '1', description: '테마 ID' })
    @IsNotEmpty()
    @IsNumber()
    theme_id!: number;   

    @ApiProperty({ example: 'test123', description: '유저 이름' })
    @IsNotEmpty()
    @IsString()
    user_name!: string;

    @ApiProperty({ example: '1234', description: '클리어 소요 시간(초)' })
    @IsNotEmpty()
    @IsNumber()
    clear_time!: number;

    @ApiProperty({ example: 10, description: '힌트 사용횟수' })
    @IsNotEmpty()
    @IsNumber()
    hint_count!: number;

    @ApiProperty({ example: 'normal', description: '엔딩 타입' })
    @IsNotEmpty()
    @IsString()
    ending_type!: string;
}
