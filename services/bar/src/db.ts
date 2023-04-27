import mongo from 'mongodb';

import config from './config';

export type MessageDocument = mongo.WithId<{
  message: string;
  timestamp: string;
}>;
export type MessageCollection = mongo.Collection<MessageDocument>;

const client = new mongo.MongoClient(config.dbUrl);

export async function init(
  createCollections: boolean
): Promise<MessageCollection> {
  const { db } = await client.connect();
  const foo = db('foo');

  if (createCollections) {
    return await foo.createCollection('messages');
  }

  return foo.collection('messages');
}
