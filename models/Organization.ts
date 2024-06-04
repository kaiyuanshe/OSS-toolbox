import { components } from '@octokit/openapi-types';
import { ListModel, Stream, toggle } from 'mobx-restful';
import { buildURLData } from 'web-utility';

import { githubClient } from './Base';

export type Organization = components['schemas']['organization'];

export class OrganizationModel extends Stream<Organization>(ListModel) {
  client = githubClient;
  baseURI = 'orgs';

  async *openStream() {
    var per_page = this.pageSize,
      since: number | undefined,
      count = 0;

    while (true) {
      const { body } = await this.client.get<Organization[]>(
        `user/${this.baseURI}?${buildURLData({ per_page, since })}`,
      );
      if (!body![0]) break;

      since = body![0].id;
      count += body!.length;
      yield* body!;

      if (body!.length < this.pageSize) break;
    }
    this.totalCount = count;
  }

  @toggle('downloading')
  async getOne(name: string) {
    return this.currentOne.login === name
      ? this.currentOne
      : super.getOne(name);
  }
}

export default new OrganizationModel();
