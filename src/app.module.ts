import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from 'node_modules/@nestjs/typeorm';
import { ConfigModule } from 'node_modules/@nestjs/config/dist/config.module';
import { ConfigService } from 'node_modules/@nestjs/config';
import { GameModule } from './game/game.module';
import { RanksModule } from './ranks/ranks.module';
import { ThemesModule } from './themes/themes.module';
import { GuestbookModule } from './guestbook/guestbook.module';

@Module({
  imports: [ ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
  }), TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      type: 'mysql',
      host: configService.get<string>('DB_HOST'),
      port: configService.get<number>('DB_PORT'),
      username: configService.get<string>('DB_USERNAME'),
      password: configService.get<string>('DB_PASSWORD'),
      database: configService.get<string>('DB_NAME'),
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  }), GameModule, RanksModule, ThemesModule, GuestbookModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
