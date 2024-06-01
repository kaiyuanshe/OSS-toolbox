import { i18n } from '../models/Translation';

const { t } = i18n;

export interface Link {
  title: string;
  path?: string;
  subs?: Link[];
}

export const MainRoutes: () => Link[] = () => [
  {
    title: 'GitHub issues',
    path: '/issue',
  },
  { title: t('license_tool'), path: '/license-filter' },
  {
    title: `${t('Web_polyfill_CDN')} v1`,
    path: 'https://polyfill.kaiyuanshe.cn/',
  },
  {
    title: `${t('Web_polyfill_CDN')} v2`,
    path: '/polyfill',
  },
  { title: t('open_source_mirror'), path: 'http://mirror.kaiyuanshe.cn/' },
  {
    title: 'Git Pager',
    path: 'https://github.com/login/oauth/authorize?client_id=ca05c339e0ccbe65b91c&scope=user+repo',
  },
  {
    title: t('source_code'),
    path: 'https://github.com/kaiyuanshe/OSS-toolbox',
  },
];
