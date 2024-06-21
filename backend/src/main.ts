import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Добавление CORS
  app.enableCors({
    origin: 'http://localhost:8080', // или другой ваш фронтенд хост
    credentials: true,
  });

  await app.listen(3003);
}
bootstrap();
