import { ApiProperty } from "node_modules/@nestjs/swagger/dist";
import { IsNumber, IsNotEmpty, IsString } from "class-validator";

export class CreateGuestbookDto {
    @ApiProperty({ example: '1', description: '테마 ID' })
    @IsNotEmpty()
    @IsNumber()
    theme_id!: number;

    @ApiProperty({ example: 'test123', description: '유저 이름' })
    @IsNotEmpty()
    @IsString()
    user_name!: string;

    @ApiProperty({ example: '멋진 테마네요!', description: '방명록 메시지' })
    @IsNotEmpty()
    @IsString()
    message!: string;
}
