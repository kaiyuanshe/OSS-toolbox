import { HTTPClient } from 'koajax';

import { safeAPI } from './core';

export const PolyfillHost = 'https://polyfiller.kaiyuanshe.cn';

export const polyfillClient = new HTTPClient({
  baseURI: PolyfillHost,
  responseType: 'text',
});

export default safeAPI(async ({ method, url, headers, body }, response) => {
  delete headers.host;

  const { status, body: data } = await polyfillClient.request({
    // @ts-ignore
    method,
    path: url!,
    // @ts-ignore
    headers,
    body: body || undefined,
  });

  response.status(status);
  response.setHeader('Access-Control-Allow-Headers', '*');
  response.send(data);
});
