import http from 'http';

export const getAsJson = <A>(url: string): Promise<A> =>
  new Promise((resolve) => {
    const request = http.get(url);

    request.on('response', (response) => {
      const data: Buffer[] = [];
      response.on('data', (chunk) => data.push(chunk));
      response.on('end', () => {
        const jsonData = Buffer.concat(data).toString('utf-8');
        resolve(JSON.parse(jsonData));
      });
    });
  });
