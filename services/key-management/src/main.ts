import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { MicroserviceOptions } from '@nestjs/microservices';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { Logger } from 'nestjs-pino';

import { AppModule } from './app.module';
import { getKafkaConnectionOptions } from './utils';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

  app.connectMicroservice<MicroserviceOptions>(
    getKafkaConnectionOptions(process.env.KAKFA_BROKER, true),
  );

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.setGlobalPrefix('api', { exclude: ['/'] });

  const options = new DocumentBuilder()
    .setTitle('Keys Api')
    .setDescription('The keys api doc')
    .setVersion('1.0')
    .addTag('keys')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/keys/docs/swagger', app, document);

  app.use(helmet());
  app.enableCors();
  app.useLogger(app.get(Logger));
  app.flushLogs();
  await app.startAllMicroservices();

  await app.listen(process.env.PORT || 3000);
  console.log(`KEYS Application is running on: ${await app.getUrl()}`);
}
bootstrap();
