import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
