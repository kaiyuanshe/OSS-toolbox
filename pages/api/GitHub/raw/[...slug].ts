import { fileTypeFromBuffer } from 'file-type';
import { githubClient } from 'mobx-github';

import { safeAPI } from '../../core';

export default safeAPI(async ({ method, url, headers, body }, response) => {
  delete headers.host;

  const path =
    'https://raw.githubusercontent.com/' +
    url!.slice(`/api/GitHub/raw/`.length);
  console.log(path);

  const { status, body: data } = await githubClient.request<ArrayBuffer>({
    // @ts-expect-error KoAJAX type compatibility
    method,
    path,
    // @ts-expect-error KoAJAX type compatibility
    headers,
    body: body || undefined,
    responseType: 'arraybuffer',
  });

  const buffer = Buffer.alloc(data!.byteLength),
    view = new Uint8Array(data!);

  for (let i = 0; i < buffer.length; i++) buffer[i] = view[i];

  const { mime } = (await fileTypeFromBuffer(buffer)) || {};

  response.status(status);
  response.setHeader('Content-Type', mime || 'application/octet-stream');
  response.send(buffer);
});
