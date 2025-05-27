import { Middleware } from 'koa';
import { DataObject } from 'mobx-restful';

import { polyfillClient } from '../../models/Base';
import { UserAgent } from '../../models/configuration';
import { withSafeKoa } from './core';

const middleware: Middleware = async context => {
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
};

export default withSafeKoa(middleware);
