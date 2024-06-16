import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { LoggerModule } from 'nestjs-pino';
import { pinoHttpConfig } from '@nestjs-microservices/config';
import { authMiddleware } from '@nestjs-microservices/auth';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaModule } from './kafka/kafka.module';
import { KeysModule } from './keys/keys.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ['../../.env', '.env'] }),
    ThrottlerModule.forRoot(),
    LoggerModule.forRoot({ pinoHttp: pinoHttpConfig }),
    KafkaModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.KEY_DB_HOST,
      port: +process.env.KEY_DB_PORT,
      username: process.env.KEY_DB_USERNAME,
      password: process.env.KEY_DB_PASSWORD,
      database: process.env.KEY_DB_DATABASE,
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV === 'local', // !NOTE: synchronize will change the database as per the schema don't use in PRODUCTION
    }),
    KeysModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(authMiddleware).forRoutes('*');
  }
}
