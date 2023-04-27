import type http from 'http';

import express from 'express';
import type { Producer } from 'kafkajs';

import config from './config';
import cors from './cors';

export default function app(producer: Producer) {
  const app = express();
  app.use(cors);

  const handleRoot: express.RequestHandler = async (_, res) => {
    res.type('text/plain');
    await producer.send({
      topic: 'foo',
      messages: [
        {
          key: 'Greeting',
          value: 'Someone called foo!',
        },
      ],
    });
    res.status(200);
    res.end();
  };

  app.post('/', handleRoot);

  return {
    app,
    start: () => {
      const server = app.listen(config.port);
      return new Promise<http.Server>((resolve) =>
        server.on('listening', () => resolve(server))
      );
    },
  };
}
