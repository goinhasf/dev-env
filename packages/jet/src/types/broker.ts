import * as Q from '~/types/queue';

class Log {}

class PartitionedLog {}

type QueueBrokerSendResult = {
  id: string;
  messageId: string;
  hash: {
    alg: string;
    value: string;
  };
};

interface QueueBrokerApi {
  sender<A>(
    producer: Q.Producer<A, QueueBrokerSendResult>
  ): (typeof producer)['send'];
}

interface ConsumerGroupBroker {
  sender<A>(
    producer: Q.Producer<A, QueueBrokerSendResult>
  ): (typeof producer)['send'];
}
