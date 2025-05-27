import { createKoaRouter, withKoaRouter } from 'next-ssr-middleware';

import { githubClient } from '../../../models/Base';
import { CACHE_REPOSITORY, CrawlerEmail } from '../../../models/configuration';
import { JWTContext, parseJWT, safeAPI } from '../core';

export interface CrawlerTask {
  URI: string;
  title?: string;
}

export const config = { api: { bodyParser: false } };

const router = createKoaRouter(import.meta.url);

router.post('/', safeAPI, parseJWT, async (context: JWTContext) => {
  if (!('user' in context.state) || context.state.user.email !== CrawlerEmail)
    return context.throw(401);

  const { URI, title = URI } = Reflect.get(context.request, 'body') as CrawlerTask;

  const { status, body } = await githubClient.post(`repos/${CACHE_REPOSITORY}/issues`, {
    title,
    labels: ['crawler'],
    body: `### URL\n\n${URI}`,
  });
  context.status = status;
  context.body = body;
});

export default withKoaRouter(router);
