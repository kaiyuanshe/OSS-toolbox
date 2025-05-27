import 'core-js/full/array/from-async';

import { HTTPClient } from 'koajax';
import { githubClient } from 'mobx-github';

import { API_Host, GithubToken, isServer, PolyfillHost, ProxyBaseURL } from './configuration';

export const ownClient = new HTTPClient({
  baseURI: `${API_Host}/api/`,
  responseType: 'json',
});

export const polyfillClient = new HTTPClient({
  baseURI: PolyfillHost,
  responseType: 'text',
});

if (!isServer()) githubClient.baseURI = `${API_Host}/api/GitHub/`;

githubClient.use(({ request }, next) => {
  if (GithubToken)
    request.headers = {
      authorization: `Bearer ${GithubToken}`,
      ...request.headers,
    };
  return next();
});

export { githubClient };

export const githubRawClient = new HTTPClient({
  baseURI: `${ProxyBaseURL}/raw.githubusercontent.com/`,
  responseType: 'arraybuffer',
});
