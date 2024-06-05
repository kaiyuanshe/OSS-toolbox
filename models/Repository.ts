import { githubClient, RepositoryModel, UserModel } from 'mobx-github';
import { parseCookie } from 'mobx-i18n';
import { toggle } from 'mobx-restful';

import { API_Host, isServer } from './Base';

const GithubToken =
  parseCookie(globalThis.document?.cookie || '').token ||
  process.env.GITHUB_TOKEN;

if (!isServer()) githubClient.baseURI = `${API_Host}/api/GitHub/`;

githubClient.use(({ request }, next) => {
  if (GithubToken)
    request.headers = {
      authorization: `Bearer ${GithubToken}`,
      ...request.headers,
    };
  return next();
});

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
    const { body } = await this.client.get<ArrayBuffer>(
      `raw/${identity}/${ref}/${path}`,
      {},
      { responseType: 'arraybuffer' },
    );
    return body!;
  }
}

export const userStore = new UserModel();
export const repositoryStore = new GitRepositoryModel('kaiyuanshe');
