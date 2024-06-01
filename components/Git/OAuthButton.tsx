import { Icon } from 'idea-react';
import { observer } from 'mobx-react';
import { FC } from 'react';
import { Button } from 'react-bootstrap';

import { i18n } from '../../models/Translation';
import { client_id } from '../../pages/api/GitHub/OAuth';

const { t } = i18n;

export interface OAuthButtonProps {
  scopes?: string[];
}

export const OAuthButton: FC<OAuthButtonProps> = observer(
  ({ scopes = ['user', 'repo'] }) => (
    <Button
      variant="dark"
      href={`https://github.com/login/oauth/authorize?${new URLSearchParams({
        client_id,
        scope: scopes.join(' '),
      })}`}
    >
      <Icon name="github" />
      {/* {t('sign-in')} */}
    </Button>
  ),
);
