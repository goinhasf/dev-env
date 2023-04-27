import { Producer, PublishResponseAsync } from '~/types/producer';

export interface Client {
  send: <Topic>(topic: Topic, message: string) => PublishResponseAsync<Topic>;
}

export class HttpProducer<Topic> implements Producer<Topic> {
  constructor(private readonly client: Client) {}
  public readonly send: Producer<Topic>['send'] = ({ message, topic }) =>
    this.client.send<Topic>(topic, message);
}
