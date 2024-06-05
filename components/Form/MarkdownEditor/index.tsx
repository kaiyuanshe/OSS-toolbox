import classNames from 'classnames';
import { debounce } from 'lodash';
import { marked } from 'marked';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import {
  ClipboardEvent,
  Component,
  createRef,
  DragEvent,
  FormEvent,
} from 'react';
import { insertToCursor, parseDOM } from 'web-utility';

import STYLE from './index.module.less';
import turnDown from './TurnDown';

export type EditorProps = { rules?: any };

type InputHandler = (event: FormEvent) => void;

@observer
export class MarkdownEditor extends Component<EditorProps> {
  convertor = turnDown;
  private contentEditable = createRef<HTMLDivElement>();

  get root() {
    return this.contentEditable.current;
  }

  @observable
  accessor count = 0;

  constructor(props: EditorProps) {
    super(props);

    for (let key in props.rules) this.convertor.addRule(key, props.rules[key]);
  }

  async componentDidMount() {
    const MarkdownIME = await import('markdown-ime');
    // @ts-ignore
    MarkdownIME.Enhance(this.root);
  }

  countText = debounce(() => {
    var count = 0;

    if (this.root) count = (this.root.textContent || '').trim().length;

    this.count = count;
  });

  private manualChange() {
    this.countText();

    if (this.root)
      this.root.dispatchEvent(
        new CustomEvent('input', {
          bubbles: true,
          detail: this.root.textContent,
        }),
      );
  }

  set raw(code) {
    if (!this.root) return;

    this.root.innerHTML = marked(code) as string;

    this.manualChange();
  }

  get raw() {
    return this.root ? this.convertor.turndown(this.root) : '';
  }

  handleOuterData = async (event: DragEvent | ClipboardEvent) => {
    const { nativeEvent } = event;
    const { items } =
      ('dataTransfer' in nativeEvent
        ? nativeEvent.dataTransfer
        : nativeEvent.clipboardData) || {};

    if (!items?.[0]) return;

    event.preventDefault();

    var list: DataTransferItem[] = Array.from(items);

    if (list.find(({ type }) => /xml|html/.test(type)))
      list = list.filter(({ type }) => type !== 'text/plain');

    const parts = await Promise.all(
      list.map((item: DataTransferItem) => {
        if (item.kind === 'string')
          return new Promise(resolve =>
            item.getAsString(raw => resolve(marked(raw))),
          );

        const file = item.getAsFile();

        if (file) {
          const src = URL.createObjectURL(file);

          switch (item.type.split('/')[0]) {
            case 'image':
              return `<img src=${src}>`;
            case 'audio':
              return `<audio src=${src}></audio>`;
            case 'video':
              return `<video src=${src}></video>`;
          }
        }
        return '';
      }),
    );

    insertToCursor(...parseDOM(parts.filter(Boolean).join('\n')));

    if (this.root)
      for (const paragraph of this.root.querySelectorAll('p p'))
        paragraph.replaceWith(...paragraph.childNodes);

    this.manualChange();
  };

  render() {
    return (
      <div
        contentEditable
        ref={this.contentEditable}
        className={classNames(
          'form-control',
          'markdown-body',
          'h-auto',
          STYLE.editor,
        )}
        data-count={this.count}
        onInput={this.countText as InputHandler}
        onPaste={this.handleOuterData}
        onDrop={this.handleOuterData}
      />
    );
  }
}
