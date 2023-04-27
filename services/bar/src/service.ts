import { Consumer } from 'kafkajs';
import mongo from 'mongodb';

import { MessageCollection } from './db';

export type MessageBody = {
  message: string;
  timestamp: string;
};

export async function insertMessage(
  value: MessageBody,
  collection: MessageCollection
): Promise<mongo.BSON.ObjectId> {
  const result = await collection.insertOne({
    _id: new mongo.ObjectId(),
    ...value,
  });

  return result.insertedId;
}

export class MessageService {
  constructor(
    private readonly collection: MessageCollection,
    private readonly consumer: Consumer
  ) {}

  async start() {
    await this.consumer.connect();
    console.log(`Connected to kafka broker.`);

    await this.consumer.subscribe({
      topic: 'foo',
    });
    console.log(`Subscribed to foo topic.`);

    this.consumer.run({
      eachMessage: async ({ message }) => {
        const { value } = message;
        if (!value) {
          return;
        }

        const deserializedValue = JSON.parse(value?.toString('utf-8'));
        await insertMessage(deserializedValue, this.collection);
      },
    });
  }
}
