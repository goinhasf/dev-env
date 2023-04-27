import * as db from './db';
import kafka from './kafka';
import { MessageService } from './service';

async function main() {
  const consumer = kafka.consumer({
    groupId: 'bar',
    retry: {
      restartOnFailure: () => Promise.resolve(true),
    },
  });
  const collection = await db.init(false);
  return await new MessageService(collection, consumer).start();
}

main();
