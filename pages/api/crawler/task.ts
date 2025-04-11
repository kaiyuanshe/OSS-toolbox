import { githubClient } from 'mobx-github';

import { safeAPI } from '../core';

export interface CrawlerTask {
  URI: string;
  title?: string;
}

const { CRAWLER_TOKEN } = process.env;

export default safeAPI(async ({ method, headers, body }, response) => {
  if (
    !CRAWLER_TOKEN ||
    CRAWLER_TOKEN !== headers.authorization?.split(/\s+/)[1]
  )
    return void response.status(401).end();

  if (method !== 'POST') return void response.status(405).end();

  const { URI, title = URI } = body as CrawlerTask;

  const { status, body: data } = await githubClient.post(
    'repos/kaiyuanshe/OWS-cache/issues',
    {
      title,
      body: `### URL\n\n${URI}`,
      labels: ['crawler'],
    },
  );
  response.status(status).send(data);
});
