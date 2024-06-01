import { safeAPI } from '../core';

export const client_id = process.env.NEXT_PUBLIC_GITHUB_OAUTH_CLIENT_ID!,
  client_secret = process.env.GITHUB_OAUTH_CLIENT_SECRET!;

export default safeAPI(async ({ query: { code } }, res) => {
  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ client_id, client_secret, code }),
  });
  const { error, access_token } = await response.json();

  if (error) throw new URIError(error);

  res.setHeader('Set-Cookie', `token=${access_token}; Path=/`);

  res.redirect('/');
});
