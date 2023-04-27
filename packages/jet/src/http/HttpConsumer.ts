import * as har from '@funkia/hareactive';
import express from 'express';
import http from 'http';
import { Consumer, Subscription } from '~/types/consumer';

type Settings = {
  method: 'get' | 'post';
  path: string;
  port?: number;
};

export class HttpConsumer<A = unknown> implements Consumer<A> {
  private constructor(
    private readonly _server: http.Server,
    public readonly _stream: har.Stream<A>
  ) {}

  public static open<A>(endpoint: Settings): Promise<HttpConsumer<A>> {
    const sink = har.sinkStream<A>();
    const app = express()
      .use(express.text())
      .use(express.json())
      [endpoint.method](endpoint.path, (req, res) => {
        sink.push(req.body);
        res.status(201);
        res.end();
      });

    return new Promise<HttpConsumer<A>>((resolve, reject) => {
      const server = app.listen(endpoint?.port);
      server.on('listening', () => {
        resolve(new HttpConsumer<A>(server, sink));
      });

      server.on('error', reject);
    });
  }

  close(): void {
    this._stream.deactivate(true);
    this._server?.close();
  }

  subscribe(callback: (_: A) => void): Subscription {
    const listener = this._stream.subscribe(callback);
    return {
      unsubscribe: () => {
        this._stream.removeListener(listener.node);
      },
    };
  }
}
