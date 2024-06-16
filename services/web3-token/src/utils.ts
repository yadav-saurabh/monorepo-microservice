import { EVENTS } from '@nestjs-microservices/events';
import { ClientOptions, Transport } from '@nestjs/microservices';

export function getKafkaConnectionOptions(
  broker: string | string[],
  subscribe?: boolean,
): ClientOptions {
  return {
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: EVENTS.WEB3.ID,
        brokers: Array.isArray(broker) ? broker : [broker],
      },
      consumer: { groupId: EVENTS.WEB3.CONSUMER },
      subscribe: { fromBeginning: subscribe ? true : false },
    },
  };
}
