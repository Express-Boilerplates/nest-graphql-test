import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as CookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    credentials: true,
    origin: process.env.CLIENT || 'http://localhost:3000',
  });

  app.use(CookieParser());
  let port = process.env.PORT || 4545;
  await app.listen(port);

  console.log('http://localhost:' + port);
}
bootstrap();
