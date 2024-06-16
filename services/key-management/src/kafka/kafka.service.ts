import {
  Inject,
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

import { EVENTS } from '@nestjs-microservices/events';
import { Key } from 'src/keys/entities/key.entity';
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

  emitKeysCreated(data: Key) {
    this.client.emit(EVENTS.KEYS.CREATED, { value: { ...data } });
  }

  emitKeysUpdated(data: Key) {
    this.client.emit(EVENTS.KEYS.UPDATED, { value: { ...data } });
  }

  emitKeysDeleted(data: { key: string }) {
    this.client.emit(EVENTS.KEYS.DELETED, { value: { ...data } });
  }
}
