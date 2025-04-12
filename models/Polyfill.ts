import { computed, observable } from 'mobx';
import {
  Filter,
  ListModel,
  persist,
  restore,
  Stream,
  toggle,
} from 'mobx-restful';
import { buildURLData, Day, isEmpty } from 'web-utility';

import { isServer, ownClient, polyfillClient, PolyfillHost } from './Base';

export type JSEnvironment = 'window' | 'worker' | 'node';

export type LibraryAlias = Record<JSEnvironment, string>;

export type LibraryPath = Record<JSEnvironment, string[]>;

export interface Library {
  features: string[];
  dependencies: string[];
  contexts: {};
  meta?: object;
  mustComeAfter?: string | string[];
}

export interface RemoteLibrary extends Library {
  library: string | LibraryAlias;
  relativePaths: string[] | LibraryPath;
}

export interface LocalLibrary extends Library {
  version: string;
  localPaths: string[];
}

export interface LibrarySuite {
  polyfills: string[];
}

export type PolyfillIndex = Record<
  string,
  RemoteLibrary | LocalLibrary | LibrarySuite
>;

export interface Polyfill extends Library {
  name: string;
}

export class PolyfillModel extends Stream<Polyfill>(ListModel) {
  client = polyfillClient;

  @persist({ expireIn: Day })
  @observable
  accessor index: PolyfillIndex = {};

  @observable
  accessor currentUA = '';

  @observable
  accessor currentFeatures: string[] = [];

  @computed
  get polyfillURL() {
    return `${PolyfillHost}/api/polyfill?features=${this.currentFeatures}`;
  }

  @observable
  accessor sourceCode = '';

  restored = !isServer() && restore(this, 'Polyfill');

  async *openStream({ name: keyword }: Filter<Polyfill>) {
    await this.restored;

    if (isEmpty(this.index)) {
      const { body } = await this.client.get<PolyfillIndex>(`index.json`);

      this.index = body!;
    }
    for (const [name, meta] of Object.entries(this.index))
      if (!('polyfills' in meta) && (!keyword || name.includes(keyword)))
        yield { name, ...meta };
  }

  @toggle('downloading')
  async getSourceCode(browser: string, features: string[]) {
    const { body } = await ownClient.get<string>(
      `polyfill?${buildURLData({ browser, features })}`,
      {},
      { responseType: 'text' },
    );
    this.currentUA = browser;
    this.currentFeatures = features;

    return (this.sourceCode = body!);
  }
}

export default new PolyfillModel();
