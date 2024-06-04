import { components } from '@octokit/openapi-types';
import { computed, observable } from 'mobx';
import { BaseModel, toggle } from 'mobx-restful';

import { githubClient } from './Base';
import { OrganizationModel } from './Organization';

export type User = components['schemas']['public-user'];

export class UserModel extends BaseModel {
  client = githubClient;

  @observable
  accessor session: User | undefined;

  organizationStore = new OrganizationModel();

  @computed
  get namespaces() {
    return [
      this.session?.login,
      ...this.organizationStore.allItems.map(({ login }) => login),
    ].filter(Boolean) as string[];
  }

  @toggle('downloading')
  async getSession() {
    if (this.session) return this.session;

    const { body } = await this.client.get<User>('user');

    await this.organizationStore.getAll();

    return (this.session = body!);
  }
}

export default new UserModel();
