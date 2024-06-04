import { Loading } from 'idea-react';
import { computed, observable, reaction } from 'mobx';
import { observer } from 'mobx-react';
import { Component } from 'react';
import { Col, Row } from 'react-bootstrap';

import { RepositoryModel } from '../../models/Repository';
import userStore from '../../models/User';
import { SelectInput } from '../Form/SelectInput';

export type RepositoryIdentity = Record<'owner' | 'name', string>;

export interface RepositorySelectProps {
  onChange: (value: RepositoryIdentity) => any;
}

@observer
export class RepositorySelect extends Component<RepositorySelectProps> {
  @observable
  accessor owner = '';

  @computed
  get repositoryStore() {
    const { owner } = this;

    return new RepositoryModel(owner === userStore.session?.login ? '' : owner);
  }

  componentDidMount() {
    userStore.getSession();
  }

  #disposer = reaction(
    () => this.owner,
    () => this.repositoryStore.getAll(),
  );

  componentWillUnmount() {
    this.#disposer();
  }

  render() {
    const { namespaces } = userStore,
      repositories = this.repositoryStore.allItems,
      downloading = userStore.downloading || this.repositoryStore.downloading;

    return (
      <Row xs={1} sm={2}>
        {downloading > 0 && <Loading />}
        <Col>
          <SelectInput
            className="form-control"
            options={namespaces}
            onBlur={({ currentTarget: { value } }) =>
              value.trim() && (this.owner = value)
            }
          />
        </Col>
        <Col>
          <SelectInput
            className="form-control"
            options={repositories.map(({ name }) => name!)}
            onBlur={({ currentTarget: { value } }) =>
              value.trim() &&
              this.props.onChange({ owner: this.owner, name: value })
            }
          />
        </Col>
      </Row>
    );
  }
}
