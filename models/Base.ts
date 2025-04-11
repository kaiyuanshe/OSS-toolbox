import 'core-js/full/array/from-async';

import { HTTPClient } from 'koajax';
import { githubClient } from 'mobx-github';

export const isServer = () => typeof window === 'undefined';

const VercelHost = process.env.VERCEL_URL;

export const API_Host = isServer()
  ? VercelHost
    ? `https://${VercelHost}`
    : 'http://localhost:3000'
  : globalThis.location.origin;

export const ownClient = new HTTPClient({
  baseURI: `${API_Host}/api/`,
  responseType: 'json',
});

export const PolyfillHost = 'https://polyfiller.kaiyuanshe.cn';

export const polyfillClient = new HTTPClient({
  baseURI: PolyfillHost,
  responseType: 'text',
});

const GithubToken =
  (globalThis.location && new URLSearchParams(location.search).get('token')) ||
  process.env.GITHUB_TOKEN;

if (!isServer()) githubClient.baseURI = `${API_Host}/api/GitHub/`;

githubClient.use(({ request }, next) => {
  if (GithubToken)
    request.headers = {
      authorization: `Bearer ${GithubToken}`,
      ...request.headers,
    };
  return next();
});

export const ProxyBaseURL = 'https://test.oss-toolbox.kaiyuanshe.cn/proxy';

export const githubRawClient = new HTTPClient({
  baseURI: `${ProxyBaseURL}/raw.githubusercontent.com/`,
  responseType: 'arraybuffer',
});
