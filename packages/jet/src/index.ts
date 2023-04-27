import http from 'http';

import { HttpConsumer } from '~/http/HttpConsumer';
import { HttpProducer } from '~/http/HttpProducer';

const producer = new HttpProducer<unknown>({
  send: async function (topic, message) {
    return new Promise((resolve) => {
      const request = http
        .request('http://localhost:9000', { method: 'post' })
        .setHeader('Content-Type', 'application/json');

      const payload = JSON.stringify({ topic, message });

      request.write(payload, (err) =>
        err
          ? resolve({
              topic,
              errorMessage: err.message,
            })
          : resolve({
              topic,
              data: 'Published',
            })
      );

      request.end();
    });
  },
});

HttpConsumer.open({
  method: 'post',
  path: '/',
  port: 9000,
}).then((consumer) => {
  consumer.subscribe(console.log);
  producer.send({
    message: 'Hello',
    topic: 'Greeting',
  });
});
