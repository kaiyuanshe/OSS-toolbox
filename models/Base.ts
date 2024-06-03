import { HTTPClient } from 'koajax';
import { parseCookie } from 'mobx-i18n';

export const isServer = () => typeof window === 'undefined';

const VercelHost = process.env.VERCEL_URL,
  GithubToken =
    parseCookie(globalThis.document?.cookie || '').token ||
    process.env.GITHUB_TOKEN;

export const API_Host = isServer()
  ? VercelHost
    ? `https://${VercelHost}`
    : 'http://localhost:3000'
  : globalThis.location.origin;

export const ownClient = new HTTPClient({
  baseURI: `${API_Host}/api/`,
  responseType: 'json',
});

export const githubClient = new HTTPClient({
  baseURI: isServer() ? 'https://api.github.com/' : `${API_Host}/api/GitHub/`,
  responseType: 'json',
}).use(({ request }, next) => {
  if (GithubToken)
    request.headers = {
      authorization: `Bearer ${GithubToken}`,
      ...request.headers,
    };
  return next();
});
