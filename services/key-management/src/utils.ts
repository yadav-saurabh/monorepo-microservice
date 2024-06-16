import { EVENTS } from '@microservices/events';
import { ClientOptions, Transport } from '@nestjs/microservices';

export function getKafkaConnectionOptions(
  broker: string | string[],
  subscribe?: boolean,
): ClientOptions {
  return {
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: EVENTS.KEYS.ID,
        brokers: Array.isArray(broker) ? broker : [broker],
      },
      consumer: { groupId: EVENTS.KEYS.CONSUMER },
      subscribe: { fromBeginning: subscribe ? true : false },
    },
  };
}
