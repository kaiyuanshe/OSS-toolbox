import { DataObject, Middleware } from 'next-ssr-middleware';

import { githubClient } from '../../../models/Base';
import { safeAPI } from '../core';

export const proxyGithub = <T>(dataFilter?: (path: string, data: T) => T) =>
  safeAPI(async ({ method, url, headers, body }, response) => {
    delete headers.host;

    const path = url!.slice(`/api/GitHub/`.length);

    const { status, body: data } = await githubClient.request<T>({
      // @ts-ignore
      method,
      path,
      // @ts-ignore
      headers,
      body: body || undefined,
    });

    response.status(status);
    response.send(dataFilter?.(path, data as T) || data);
  });

export interface OAuthTicket {
  code: string;
  state?: string;
}

export interface OAuthOption {
  signInURL: (pageURL: string) => string;
  accessToken: (ticket: OAuthTicket) => Promise<string>;
  userProfile: (token: string) => Promise<DataObject>;
  tokenKey?: string;
}

export interface OAuthProps<T extends DataObject> {
  token: string;
  user: T;
}

export function oauthSigner<I extends DataObject, O extends DataObject = {}>({
  signInURL,
  accessToken,
  userProfile,
  tokenKey = 'token',
}: OAuthOption): Middleware<I, O> {
  return async (
    { req: { url, headers, cookies }, query: { code, state }, res },
    next,
  ) => {
    const token = cookies[tokenKey];
    const pageURL =
      new URL(
        url || '/',
        headers['origin'] || process.env.VERCEL_URL || 'http://127.0.0.1:3000',
      ) + '';

    if (code) {
      const ticket = { code, state } as OAuthTicket;

      const token = await accessToken(ticket);

      res.setHeader('Set-Cookie', `token=${token}; Path=/`);

      return {
        redirect: { destination: pageURL.split('?')[0], permanent: false },
        props: {} as O,
      };
    }
    if (token)
      try {
        const user = await userProfile(token),
          data = await next();

        return {
          ...data,
          props: 'props' in data ? { ...data.props, token, user } : ({} as O),
        };
      } catch {
        //
      }
    return {
      redirect: { destination: signInURL(pageURL + ''), permanent: false },
      props: {} as O,
    };
  };
}

const client_id = process.env.NEXT_PUBLIC_GITHUB_OAUTH_CLIENT_ID!,
  client_secret = process.env.GITHUB_OAUTH_CLIENT_SECRET!;

export const githubOAuth = oauthSigner({
  signInURL: redirect_uri =>
    `https://github.com/login/oauth/authorize?${new URLSearchParams({
      client_id,
      scope: 'user repo',
      redirect_uri,
    })}`,
  accessToken: async ({ code }) => {
    const response = await fetch(
      'https://github.com/login/oauth/access_token',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ client_id, client_secret, code }),
      },
    );
    const { error, access_token } = await response.json();

    if (error) throw new URIError(error);

    return access_token;
  },
  userProfile: async token => {
    const response = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
    if (response.status > 299) throw new URIError('Invalid token');

    return response.json();
  },
});
