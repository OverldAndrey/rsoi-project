import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config: ConfigService = app.get<ConfigService>(ConfigService);

  app.enableCors({
    origin: '*',
  })

  await app.listen(config.get('port'), config.get('host'), () => {
    console.log(`Server running on ${config.get('port')}`);
  });
}
bootstrap();
