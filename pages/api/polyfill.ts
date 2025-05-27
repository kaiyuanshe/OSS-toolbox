import { DataObject } from 'mobx-restful';
import { createKoaRouter } from 'next-ssr-middleware';

import { polyfillClient } from '../../models/Base';
import { UserAgent } from '../../models/configuration';
import { withSafeKoaRouter } from './core';

const router = createKoaRouter(import.meta.url);

router.all('/(.*)', async context => {
  const { url, query, headers } = context;

  delete headers.host;

  const UA = UserAgent[query.browser as string];

  const { status, body: data } = await polyfillClient.get(url!, {
    ...headers,
    'User-Agent': UA,
  } as DataObject);

  context.status = status;
  context.set('Access-Control-Allow-Headers', '*');
  context.set('Content-Type', 'text/javascript');
  context.body = data;
});

export default withSafeKoaRouter(router);
