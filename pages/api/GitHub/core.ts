import { githubClient } from 'mobx-github';
import { githubOAuth2 } from 'next-ssr-middleware';

import { ProxyBaseURL } from '../../../models/Base';
import { safeAPI } from '../core';

export const proxyGithub = <T>(dataFilter?: (path: string, data: T) => T) =>
  safeAPI(async ({ method, url, headers, body }, response) => {
    delete headers.host;

    const path = url!.slice(`/api/GitHub/`.length);

    const { status, body: data } = await githubClient.request<T>({
      // @ts-expect-error KoAJAX type compatibility
      method,
      path,
      // @ts-expect-error KoAJAX type compatibility
      headers,
      body: body || undefined,
    });

    response.status(status);
    response.send(dataFilter?.(path, data as T) || data);
  });

const client_id = process.env.GITHUB_OAUTH_CLIENT_ID!,
  client_secret = process.env.GITHUB_OAUTH_CLIENT_SECRET!,
  { VERCEL } = process.env;

export const githubOAuth = githubOAuth2({
  rootBaseURL: VERCEL ? undefined : `${ProxyBaseURL}/github.com/`,
  client_id,
  client_secret,
  scopes: ['user', 'repo'],
});
