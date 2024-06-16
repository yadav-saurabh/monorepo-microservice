import {
  Inject,
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

import { KAFKA_SERVICE } from './kafka.constants';

@Injectable()
export class KafkaService implements OnModuleInit, OnApplicationShutdown {
  constructor(@Inject(KAFKA_SERVICE) private readonly client: ClientKafka) {}

  async onModuleInit() {
    await this.client.connect();
  }

  async onApplicationShutdown() {
    await this.client.close();
  }
}
