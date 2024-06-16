import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, ClientsModule } from '@nestjs/microservices';

import { KAFKA_SERVICE } from './kafka.constants';
import { KafkaService } from './kafka.service';
import { getKafkaConnectionOptions } from '../utils';

@Global()
@Module({
  imports: [ConfigModule, ClientsModule.register([{ name: KAFKA_SERVICE }])],
  providers: [
    {
      provide: KAFKA_SERVICE,
      useFactory: (configService: ConfigService) =>
        ClientProxyFactory.create(
          getKafkaConnectionOptions(configService.get('KAFKA_BROKER')),
        ),
      inject: [ConfigService],
    },
    KafkaService,
  ],
  exports: [KafkaService],
})
export class KafkaModule {}
