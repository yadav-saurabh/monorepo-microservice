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
import { TokensModule } from './tokens/tokens.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ['../../.env', '.env'] }),
    ThrottlerModule.forRoot(),
    LoggerModule.forRoot({ pinoHttp: pinoHttpConfig }),
    KafkaModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.WEB3_DB_HOST,
      port: +(process.env.WEB3_DB_PORT || 5432),
      username: process.env.WEB3_DB_USERNAME,
      password: process.env.WEB3_DB_PASSWORD,
      database: process.env.WEB3_DB_DATABASE,
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV === 'local', // !NOTE: synchronize will change the database as per the schema don't use in PRODUCTION
    }),
    KeysModule,
    TokensModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(authMiddleware).forRoutes('*');
  }
}
