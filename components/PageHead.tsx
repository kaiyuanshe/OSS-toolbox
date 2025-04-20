import { observer } from 'mobx-react';
import Head from 'next/head';
import type { FC, PropsWithChildren } from 'react';

import { i18n } from '../models/Translation';

export type PageHeadProps = PropsWithChildren<{
  title?: string;
  description?: string;
}>;

const { t } = i18n,
  Summary = process.env.NEXT_PUBLIC_SITE_SUMMARY;

export const PageHead: FC<PageHeadProps> = observer(
  ({ title, description = Summary, children }) => (
    <Head>
      <title>
        {`${title ? `${title} - ` : ''}${t('open_source_treasure_box')}`}
      </title>

      {description && <meta name="description" content={description} />}

      {children}
    </Head>
  ),
);
