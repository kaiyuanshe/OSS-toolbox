import { HTTPClient } from 'koajax';

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
