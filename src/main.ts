import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  app.enableCors({
    origin: 'http://localhost:5173', // 허용할 프론트엔드 도메인 (배포 시 실제 도메인 사용)
    credentials: true, // 쿠키나 인증 헤더(Authorization)를 포함해야 할 경우 필수
  });

  const config = new DocumentBuilder()
    .setTitle('404 Not Found API')           
    .setDescription('API 상세 설명') 
    .setVersion('1.0')                     
    .addBearerAuth()                        
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // http://localhost:3000/api-docs)
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
