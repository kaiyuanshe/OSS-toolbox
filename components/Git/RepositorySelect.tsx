import { Loading } from 'idea-react';
import { computed, observable } from 'mobx';
import { OrganizationModel, RepositoryModel } from 'mobx-github';
import { observer } from 'mobx-react';
import { ObservedComponent } from 'mobx-react-helper';
import { SearchableInput } from 'mobx-restful-table';
import { Col, Row } from 'react-bootstrap';

import { userStore } from '../../models/Repository';
import { i18n, I18nContext } from '../../models/Translation';

export type RepositoryIdentity = Record<'owner' | 'name', string>;

export interface RepositorySelectProps {
  onChange: (value: RepositoryIdentity) => any;
}

@observer
export class RepositorySelect extends ObservedComponent<RepositorySelectProps, typeof i18n> {
  static contextType = I18nContext;

  @observable
  accessor owner = '';

  @computed
  get organizationStore() {
    return new OrganizationModel(userStore.session?.login);
  }

  @computed
  get repositoryStore() {
    const { owner } = this;

    return new RepositoryModel(owner === userStore.session?.login ? '' : owner);
  }

  componentDidMount() {
    userStore.getSession();
  }

  render() {
    const i18n = this.observedContext,
      { downloading, session } = userStore;
    const { login } = session || {};

    return (
      <Row xs={1} sm={2}>
        {downloading > 0 && <Loading />}
        <Col>
          <SearchableInput
            translator={i18n}
            store={this.organizationStore}
            valueKey="id"
            labelKey="login"
            placeholder={`Search organization or Leave blank as ${login}`}
            onChange={([{ label } = {}]) => (this.owner = label || '')}
          />
        </Col>
        <Col>
          <SearchableInput
            translator={i18n}
            store={this.repositoryStore}
            valueKey="full_name"
            labelKey="name"
            onChange={([{ label } = {}]) =>
              label && this.props.onChange({ owner: this.owner, name: label })
            }
          />
        </Col>
      </Row>
    );
  }
}
