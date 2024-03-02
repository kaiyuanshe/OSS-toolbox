import { i18n } from '../models/Translation';

const { t } = i18n;

export interface Link {
  title: string;
  path?: string;
  subs?: Link[];
}

export const MainRoutes: () => Link[] = () => [
  { title: t('license_tool'), path: '/tool/license-filter' },
  {
    title: `${t('Web_polyfill_CDN')} v1`,
    path: 'https://polyfill.kaiyuanshe.cn/',
  },
  {
    title: `${t('Web_polyfill_CDN')} v2`,
    path: 'https://polyfiller.kaiyuanshe.cn/',
  },
  { title: t('open_source_mirror'), path: 'http://mirror.kaiyuanshe.cn/' },
  { title: 'Git Pager', path: 'https://git-pager.vercel.app/' },
  {
    title: t('source_code'),
    path: 'https://github.com/kaiyuanshe/OSS-toolbox',
  },
];
