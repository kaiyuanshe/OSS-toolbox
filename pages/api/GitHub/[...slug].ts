import { createKoaRouter } from 'next-ssr-middleware';

import { withSafeKoaRouter } from '../core';
import { proxyGitHubAll } from './core';

export const config = { api: { bodyParser: false } };

const router = createKoaRouter(import.meta.url);

router.get('/(.*)', proxyGitHubAll);

export default withSafeKoaRouter(router);
