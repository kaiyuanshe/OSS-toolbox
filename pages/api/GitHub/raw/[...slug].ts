import { fileTypeFromBuffer } from 'file-type';
import { githubClient } from 'mobx-github';
import { createKoaRouter } from 'next-ssr-middleware';

export const config = { api: { bodyParser: false } };

const router = createKoaRouter(import.meta.url);

router.all('/(.*)', async context => {
  const { method, url, headers, body } = context;

  delete headers.host;

  const path = `https://raw.githubusercontent.com/${url!.slice(`/api/GitHub/raw/`.length)}`;

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

  context.status = status;
  context.set('Content-Type', mime || 'application/octet-stream');
  context.body = buffer;
});
