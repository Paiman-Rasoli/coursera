import { ValidationPipe } from '@nestjs/common';
import { NestFactory  } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port: number = +process.env.PORT;
  app.useGlobalPipes(new ValidationPipe({
    whitelist : true,
    transform : true
  }))
  await app.listen(port);
  console.log('Server runing on port.... ', port);
}
bootstrap();
