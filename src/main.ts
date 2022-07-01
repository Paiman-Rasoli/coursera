import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port: number = +process.env.PORT;
  await app.listen(port);
  console.log('Server runing on port ', port);
}
bootstrap();
