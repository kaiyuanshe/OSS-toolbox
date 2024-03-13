import { observable } from 'mobx';
import { BaseModel, toggle } from 'mobx-restful';
import { buildURLData } from 'web-utility';

import { PolyfillHost } from '../pages/api/polyfill';
import { ownClient } from './Base';

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

export interface Alias {
  polyfills: string[];
}

export type PolyfillIndex = Record<
  string,
  RemoteLibrary | LocalLibrary | Alias
>;

export class PolyfillModel extends BaseModel {
  @observable
  accessor index: PolyfillIndex = {};

  @observable
  accessor currentUA = '';

  @observable
  accessor sourceCode = '';

  @toggle('downloading')
  async getIndex() {
    const { body } = await ownClient.get<PolyfillIndex>(
      `${PolyfillHost}/index.json`,
    );
    return (this.index = body!);
  }

  @toggle('downloading')
  async getSourceCode(browser: string, features: string[]) {
    const response = await fetch(
      `/api/polyfill?${buildURLData({ browser, features })}`,
    );
    this.currentUA = browser;
    return (this.sourceCode = await response.text());
  }
}

export default new PolyfillModel();
