import { computed, observable, reaction } from 'mobx';
import { observer } from 'mobx-react';
import { Component } from 'react';
import { Col, Row } from 'react-bootstrap';

import { OrganizationModel } from '../../models/Organization';
import { RepositoryModel } from '../../models/Repository';
import { SelectInput } from '../Form/SelectInput';

export type RepositoryIdentity = Record<'owner' | 'name', string>;

export interface RepositorySelectProps {
  onChange: (value: RepositoryIdentity) => any;
}

@observer
export class RepositorySelect extends Component<RepositorySelectProps> {
  organizationStore = new OrganizationModel();

  @observable
  accessor owner = '';

  @computed
  get repositoryStore() {
    return new RepositoryModel(this.owner);
  }

  componentDidMount() {
    this.organizationStore.getAll();
  }

  #disposer = reaction(
    () => this.owner,
    () => this.repositoryStore.getAll(),
  );

  componentWillUnmount() {
    this.#disposer();
  }

  render() {
    const organizations = this.organizationStore.allItems,
      repositories = this.repositoryStore.allItems;

    return (
      <Row xs={1} sm={2}>
        <Col>
          <SelectInput
            className="form-control"
            options={organizations.map(({ login }) => login)}
            onBlur={({ currentTarget: { value } }) => (this.owner = value)}
          />
        </Col>
        <Col>
          <SelectInput
            className="form-control"
            options={repositories.map(({ name }) => name!)}
            onChange={({ currentTarget: { value } }) =>
              this.props.onChange({ owner: this.owner, name: value })
            }
          />
        </Col>
      </Row>
    );
  }
}
