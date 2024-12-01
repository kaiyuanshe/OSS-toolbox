import { RepositoryModel, UserModel } from 'mobx-github';
import { toggle } from 'mobx-restful';

import { githubRawClient } from './Base';

export class GitRepositoryModel extends RepositoryModel {
  @toggle('downloading')
  async downloadRaw(
    path: string,
    repository = this.currentOne.name,
    ref = this.currentOne.default_branch,
  ) {
    const owner = this.owner || (await userStore.getSession()).login;
    const identity = `${owner}/${repository}`;

    if (!ref) {
      const { default_branch } = await this.getOne(identity);

      ref = default_branch;
    }
    const { body } = await githubRawClient.get<ArrayBuffer>(
      `${identity}/${ref}/${path}`,
    );
    return body!;
  }
}

export const userStore = new UserModel();
export const repositoryStore = new GitRepositoryModel('kaiyuanshe');
