import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './Context/Common/infrastructure/filter/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableShutdownHooks();
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(AppService.port());
}

bootstrap().catch(console.log);
