import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,            // 해당하지 않는 속성은 저장하지 않음. 필터해서 저장함
    forbidNonWhitelisted: true, // 해당하지 않는 속성이 들어오면 오류 발생
    transform: true,            // url로 보낸 파라미터를 실제 타입으로 변환함(url로 보내면 모두 string)
  }));

  await app.listen(3000);
}
bootstrap();
