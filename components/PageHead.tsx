import { observer } from 'mobx-react';
import Head from 'next/head';
import { FC, PropsWithChildren, useContext } from 'react';

import { Summary } from '../models/configuration';
import { I18nContext } from '../models/Translation';

export type PageHeadProps = PropsWithChildren<{
  title?: string;
  description?: string;
}>;

export const PageHead: FC<PageHeadProps> = observer(
  ({ title = '', description = Summary, children }) => {
    const { t } = useContext(I18nContext);

    return (
      <Head>
        <title>{`${title && `${title} - `}${t('open_source_treasure_box')}`}</title>

        {description && <meta name="description" content={description} />}

        {children}
      </Head>
    );
  },
);
