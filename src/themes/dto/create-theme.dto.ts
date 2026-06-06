import { IsBoolean, IsDate, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "node_modules/@nestjs/swagger/dist";

export class CreateThemeDto {
    // 기본키
    @ApiProperty({ description: '테마 ID', example: 1 })
    @IsInt()
    @IsNotEmpty()
    id!: number;

    // 테마 제목
    @ApiProperty({ description: '테마 제목', example: '404 Not Found' })
    @IsString()
    @IsNotEmpty()
    title!: string;

    // 테마 내용
    @ApiProperty({ description: '테마 내용', example: '당신은 오래된 저택에 갇혔습니다. 주변을 탐색하여 단서를 찾아 탈출하세요.' })
    @IsString()
    @IsNotEmpty()
    content!: string;

    // 장르
    @ApiProperty({ description: '테마 장르', example: '공포' })
    @IsString()
    @IsNotEmpty()
    genre!: string;

    // 난이도
    @ApiProperty({ description: '테마 난이도', example: 3 })
    @IsInt()
    @IsNotEmpty()
    difficulty!: number;

    // 시간 제한
    @ApiProperty({ description: '테마 시간 제한(초)', example: 3600 })
    @IsInt()
    @IsNotEmpty()
    time_limit!: number;

    // 잠금 상태
    @ApiProperty({ description: '테마 잠금 상태', example: true })
    @IsBoolean()
    @IsOptional()
    is_locked: boolean = true;

    // 테마 썸네일 URL
    @ApiProperty({ description: '테마 썸네일 URL', example: 'https://example.com/thumbnail.jpg' })
    @IsString()
    @IsOptional()
    thumbnail_url: string = '';
}