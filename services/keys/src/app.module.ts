import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { LoggerModule } from 'nestjs-pino';
import { pinoHttpConfig } from '@nestjs-microservices/config';
import { authMiddleware } from '@nestjs-microservices/auth';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaModule } from './kafka/kafka.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot(),
    LoggerModule.forRoot({ pinoHttp: pinoHttpConfig }),
    KafkaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(authMiddleware).forRoutes('*');
  }
}
