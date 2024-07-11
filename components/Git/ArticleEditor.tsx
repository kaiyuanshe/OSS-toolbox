import { readAs } from 'koajax';
import { debounce } from 'lodash';
import { computed, observable } from 'mobx';
import { GitContent } from 'mobx-github';
import { observer } from 'mobx-react';
import { DataObject } from 'mobx-restful';
import dynamic from 'next/dynamic';
import { ChangeEvent, Component, FormEvent, MouseEvent } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { blobOf, formatDate, uniqueID } from 'web-utility';
import YAML from 'yaml';

import { GitRepositoryModel, userStore } from '../../models/Repository';
import { ListField } from '../Form/JSONEditor';
import { PathSelect } from './PathSelect';
import { RepositorySelect } from './RepositorySelect';

const HTMLEditor = dynamic(() => import('../Form/HTMLEditor'), { ssr: false });

export const fileType = {
  MarkDown: ['md', 'markdown'],
  JSON: ['json'],
  YAML: ['yml', 'yaml'],
};

export const postMeta = /^---[\r\n]([\s\S]*?)[\r\n]---/;

export interface PostMeta extends Record<'title' | 'date', string>, DataObject {
  authors?: string[];
}

export type HyperLink = HTMLAnchorElement | HTMLImageElement;

@observer
export class ArticleEditor extends Component {
  @observable
  accessor repository = '';
  editorContent = '';

  @computed
  get currentRepository() {
    const [owner, name] = this.repository.split('/');

    return { owner, name };
  }

  @computed
  get repositoryStore() {
    const { owner } = this.currentRepository;

    return new GitRepositoryModel(
      owner === userStore.session?.login ? '' : owner,
    );
  }

  path = '';
  URL = '';

  @observable
  accessor meta: PostMeta | null = null;

  @observable
  accessor copied = false;

  static contentFilter({ type, name }: GitContent) {
    return (
      type === 'dir' ||
      (type === 'file' &&
        Object.values(fileType).flat().includes(name.split('.').slice(-1)[0]))
    );
  }

  async setPostMeta(raw?: string) {
    const meta: PostMeta = { authors: [], ...(raw ? YAML.parse(raw) : null) };

    const { login } = await userStore.getSession();

    if (!meta.authors?.includes(login)) meta.authors?.push(login);

    const path = this.URL.split('/')
      .slice(7, -1)
      .filter(name => !name.startsWith('_'));

    meta.categories = [...new Set([...path, ...(meta.categories || [])])];
    meta.tags = meta.tags || [];

    this.meta = { ...meta, title: '', date: formatDate() };
  }

  setContent = async (URL: string, data?: Blob) => {
    this.URL = URL;

    const type = URL.split('.').slice(-1)[0];

    if (!(data instanceof Blob)) {
      if (fileType.MarkDown.includes(type)) await this.setPostMeta();

      return;
    }
    var content = (await readAs(data, 'text').result) as string;

    if (fileType.JSON.includes(type)) return (this.meta = JSON.parse(content));

    if (fileType.YAML.includes(type)) return (this.meta = YAML.parse(content));

    const meta = postMeta.exec(content);

    if (!meta) await this.setPostMeta();
    else {
      content = content.slice(meta[0].length);

      meta[1] = meta[1].trim();

      if (meta[1]) this.setPostMeta(meta[1]);
    }

    this.editorContent = content;
  };

  reset = () => {
    this.meta = null;

    this.editorContent = '';
  };

  onPathClear = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    if (value.trim()) return;

    this.meta = null;

    this.editorContent = '';
  };

  fixURL = debounce(() => {
    const { repository } = this,
      pageURL = window.location.href.split('?')[0],
      root = document.querySelector('div[contenteditable]');

    if (root)
      for (let element of root.querySelectorAll<HyperLink>('[href], [src]')) {
        let URI =
          element instanceof HTMLAnchorElement ? element.href : element.src;

        if (URI.startsWith(pageURL)) URI = URI.slice(pageURL.length);

        URI = new URL(URI, this.URL || window.location.href) + '';

        if (element instanceof HTMLImageElement)
          element.src = URI.replace(
            repository + '/blob/',
            repository + '/raw/',
          );
        else element.href = URI;
      }
  });

  getContent() {
    const type = this.URL.split('.').slice(-1)[0],
      { meta, editorContent } = this;

    if (fileType.JSON.includes(type)) return JSON.stringify(meta);

    if (fileType.YAML.includes(type)) return YAML.stringify(meta);

    if (fileType.MarkDown.includes(type) && editorContent) {
      if (!meta) return editorContent;
      // @ts-ignore
      meta.updated = formatDate();

      return `---
  ${YAML.stringify(meta)}
  ---
  
  ${editorContent}`;
    }
  }

  submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { currentRepository, repositoryStore, editorContent } = this,
      // @ts-ignore
      { message } = event.currentTarget.elements;

    if (!editorContent) return;

    const root = document.querySelector('div[contenteditable]');
    const media: HTMLMediaElement[] = [].filter.call(
      root!.querySelectorAll('img[src], audio[src], video[src]'),
      ({ src }) => new URL(src).protocol === 'blob:',
    );

    for (let file of media) {
      const blob = await blobOf(file.src);

      const filePath = this.path.replace(
        /\.\w+$/,
        `/${uniqueID()}.${blob.type.split('/')[1]}`,
      );
      const { download_url } = await repositoryStore.updateContent(
        filePath,
        blob,
        '[Upload] from Git-Pager',
        currentRepository.name,
      );
      file.src = download_url!;
    }

    await repositoryStore.updateContent(
      this.path,
      this.getContent() as string,
      message.value.trim(),
      currentRepository.name,
    );
    window.alert('Submitted');
  };

  copyMarkdown = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (this.editorContent) {
      await navigator.clipboard.writeText(this.editorContent);

      this.copied = true;
    }
  };

  loadFile = async (path: string) => {
    const type = path.split('.').at(-1)?.toLowerCase();

    if (!fileType.MarkDown.includes(type || '')) return;

    const { owner, name } = this.currentRepository;

    const buffer = await this.repositoryStore.downloadRaw(path, name),
      { default_branch } = this.repositoryStore.currentOne;

    this.setContent(
      `https://github.com/${owner}/${name}/blob/${default_branch}/${path}`,
      new Blob([buffer]),
    );
  };

  render() {
    const { repository, meta, copied } = this;

    return (
      <Form
        className="my-3 d-flex flex-column gap-3"
        onReset={this.reset}
        onSubmit={this.submit}
      >
        <Form.Group className="row">
          <label className="col-sm-2 col-form-label">Repository</label>
          <RepositorySelect
            onChange={({ owner, name }) =>
              (this.repository = `${owner}/${name}`)
            }
          />
        </Form.Group>
        <Form.Group className="row">
          <label className="col-sm-2 col-form-label">File path</label>

          {repository && (
            <PathSelect repository={repository} onChange={this.loadFile} />
          )}
        </Form.Group>
        <Form.Group className="row align-items-center">
          <label className="col-sm-2 col-form-label">Commit message</label>
          <Col sm={7}>
            <Form.Control as="textarea" name="message" required />
          </Col>
          <Col
            sm={3}
            className="d-flex flex-wrap gap-2 justify-content-around align-items-center"
          >
            <Button type="submit">Commit</Button>
            <Button type="reset" variant="danger">
              Clear
            </Button>
          </Col>
        </Form.Group>

        {meta && (
          <Form.Group>
            <label>Meta</label>
            <ListField
              value={meta}
              onChange={({ currentTarget: { value } }) =>
                (this.meta = value as PostMeta)
              }
            />
          </Form.Group>
        )}
        <Form.Group onInput={this.fixURL}>
          <div className="d-flex justify-content-between align-items-center my-2">
            <label>Content</label>
            <Button
              variant="secondary"
              size="sm"
              onClick={this.copyMarkdown}
              onBlur={() => (this.copied = false)}
            >
              {copied ? '√' : ''} Copy MarkDown
            </Button>
          </div>
          <HTMLEditor
            defaultValue={this.editorContent}
            onChange={value => (this.editorContent = value)}
          />
        </Form.Group>
      </Form>
    );
  }
}
