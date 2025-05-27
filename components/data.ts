import { i18n } from '../models/Translation';

export interface Link {
  title: string;
  path?: string;
  subs?: Link[];
}

export const MainRoutes = ({ t }: typeof i18n): Link[] => [
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
    path: '/article/editor',
  },
  {
    title: t('volunteer'),
    path: '/volunteer',
  },
];
