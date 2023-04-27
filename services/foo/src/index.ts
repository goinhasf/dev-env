import app from './app';
import config from './config';
import kafka from './kafka';

const producer = kafka.producer({
  allowAutoTopicCreation: true,
  retry: {
    restartOnFailure: () => Promise.resolve(true),
    initialRetryTime: 5,
  },
});

async function main() {
  await producer.connect();
  console.log(`Connected to kafka broker.`);
  const server = await app(producer).start();
  server.on('error', () => server.close(console.error));

  console.log(`App listening on port ${config.port}`);
}

main();
