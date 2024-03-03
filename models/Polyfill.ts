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

export const UserAgent: Record<string, string> = {
  'IE 11':
    'Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko',
  'Edge 18':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge/18.19042',
  'Safari 13.2':
    'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
  'Opera 9.8': 'Opera/9.80 (Windows NT 6.1) Presto/2.12.388 Version/12.16',
  'UC 12':
    'Mozilla/5.0 (Linux; U; Android 8.1.0; en-US; Nexus 6P Build/OPM7.181205.001) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.108 UCBrowser/12.11.1.1197 Mobile Safari/537.36',
  'Firefox 70':
    'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:70.0) Gecko/20100101 Firefox/70.0',
  'Android 4':
    'Mozilla/5.0 (Linux; U; Android 4.0.2; en-us; Galaxy Nexus Build/ICL53F) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
};

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
  async getSourceCode(UA: string, features: string[]) {
    const response = await fetch(
      `/api/polyfill?${buildURLData({ features })}`,
      {
        headers: { 'User-Agent': UserAgent[UA] },
      },
    );
    this.currentUA = UA;
    return (this.sourceCode = await response.text());
  }
}

export default new PolyfillModel();
