import { readAs } from 'koajax';
import { debounce } from 'lodash';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import {
  ChangeEvent,
  Component,
  createRef,
  FormEvent,
  MouseEvent,
} from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { blobOf, formatDate, uniqueID } from 'web-utility';
import YAML from 'yaml';

import { GitContent, RepositoryModel } from '../../models/Repository';
import { ListField } from '../Form/JSONEditor';
import { MarkdownEditor } from '../Form/MarkdownEditor';
import { PathSelect } from './PathSelect';
import { RepositorySelect } from './RepositorySelect';

export const fileType = {
  MarkDown: ['md', 'markdown'],
  JSON: ['json'],
  YAML: ['yml', 'yaml'],
};

export const postMeta = /^---[\r\n]([\s\S]*?)[\r\n]---/;

export interface PostMeta
  extends Record<'title' | 'date', string>,
    Partial<Record<string, any>> {
  authors?: string[];
}

export type HyperLink = HTMLAnchorElement | HTMLImageElement;

@observer
export class ArticleEditor extends Component {
  @observable
  accessor repository = '';

  path = '';

  private Selector = createRef<PathSelect>();

  get selector() {
    return this.Selector.current!;
  }

  private Core = createRef<MarkdownEditor>();

  get core() {
    return this.Core.current;
  }

  URL = '';

  @observable
  accessor meta: PostMeta | undefined = undefined;

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
    // @ts-ignore
    const { login } = await getCurrentUser();

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

    if (this.core) this.core.raw = content;
  };

  reset = () => {
    this.meta = undefined;

    // if (this.selector) this.selector.reset();
    if (this.core) this.core.raw = '';
  };

  onPathClear = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    if (value.trim()) return;

    this.meta = undefined;

    if (this.core) this.core.raw = '';
  };

  fixURL = debounce(() => {
    const { repository } = this,
      pageURL = window.location.href.split('?')[0];

    if (this.core && this.core.root)
      for (let element of this.core.root.querySelectorAll<HyperLink>(
        '[href], [src]',
      )) {
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
      { meta, core } = this;

    if (fileType.JSON.includes(type)) return JSON.stringify(meta);

    if (fileType.YAML.includes(type)) return YAML.stringify(meta);

    if (fileType.MarkDown.includes(type) && core) {
      if (!meta) return core.raw;
      // @ts-ignore
      meta.updated = formatDate();

      return `---
  ${YAML.stringify(meta)}
  ---
  
  ${core.raw}`;
    }
  }

  submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { repository, core } = this,
      // @ts-ignore
      { message } = event.currentTarget.elements;

    if (!core || !core.root) return;

    const media: HTMLMediaElement[] = [].filter.call(
      core.root.querySelectorAll('img[src], audio[src], video[src]'),
      ({ src }) => new URL(src).protocol === 'blob:',
    );

    for (let file of media) {
      const blob = await blobOf(file.src);

      const filePath = this.path.replace(
        /\.\w+$/,
        `/${uniqueID()}.${blob.type.split('/')[1]}`,
      );

      const {
        content: { download_url },
        // @ts-ignore
      }: any = await updateContent(
        repository,
        filePath,
        '[Upload] from Git-Pager',
        blob,
      );

      file.src = download_url;
    }

    // @ts-ignore
    await updateContent(
      repository,
      this.path,
      message.value.trim(),
      this.getContent() as string,
    );

    window.alert('Submitted');
  };

  copyMarkdown = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (this.core) {
      await navigator.clipboard.writeText(this.core.raw);

      this.copied = true;
    }
  };

  loadFile = async (path: string) => {
    const type = path.split('.').at(-1)?.toLowerCase();

    if (!['md', 'markdown'].includes(type || '')) return;

    const [owner, name] = this.repository.split('/');
    const repositoryStore = new RepositoryModel(owner);

    const buffer = await repositoryStore.downloadRaw(path, name);

    this.setContent(path, new Blob([buffer]));
  };

  render() {
    const { repository, meta, copied } = this;

    return (
      <Card
        className="my-3"
        body
        as="form"
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
        <Form.Group className="row">
          <label className="col-sm-2 col-form-label">Commit message</label>
          <span className="col-sm-7">
            <Form.Control as="textarea" name="message" required />
          </span>
          <span className="col-sm-3 d-flex justify-content-between align-items-center">
            <Button type="submit">Commit</Button>
            <Button type="reset" variant="danger">
              Clear
            </Button>
          </span>
        </Form.Group>

        {meta && (
          <div className="form-group">
            <label>Meta</label>
            <ListField
              value={meta}
              onChange={({ target: { value } }: any) => (this.meta = value)}
            />
          </div>
        )}

        <Form.Group onInput={this.fixURL}>
          <label>Content</label>
          <button
            type="button"
            className="btn btn-secondary btn-sm float-end"
            onClick={this.copyMarkdown}
            onBlur={() => (this.copied = false)}
          >
            {copied ? '√' : ''} Copy MarkDown
          </button>
          <MarkdownEditor ref={this.Core} />
        </Form.Group>
      </Card>
    );
  }
}
