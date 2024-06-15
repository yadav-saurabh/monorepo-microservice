import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EVENTS } from '@nestjs-microservices/events';

import { KAFKA_SERVICE } from './kafka.constants';
import { KafkaService } from './kafka.service';

@Global()
@Module({
  imports: [
    ConfigModule,
    ClientsModule.register([
      {
        name: KAFKA_SERVICE,
        transport: Transport.KAFKA,
        options: {
          client: { clientId: EVENTS.KEYS.ID, brokers: ['kafka-service:9092'] },
          consumer: { groupId: EVENTS.KEYS.CONSUMER },
        },
      },
    ]),
  ],
  providers: [KafkaService],
  exports: [KafkaService],
})
export class KafkaModule {}
