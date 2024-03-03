import { Loading } from 'idea-react';
import { computed, observable } from 'mobx';
import { textJoin } from 'mobx-i18n';
import { observer } from 'mobx-react';
import { compose, translator } from 'next-ssr-middleware';
import { TreeNode } from 'primereact/treenode';
import { TreeSelect, TreeSelectSelectionKeysType } from 'primereact/treeselect';
import { Component } from 'react';
import { Card, Container, Dropdown, DropdownButton } from 'react-bootstrap';

import { PageHead } from '../components/PageHead';
import polyfillStore, { UserAgent } from '../models/Polyfill';
import { i18n } from '../models/Translation';
import { PolyfillHost } from './api/polyfill';

export const getServerSideProps = compose(translator(i18n));

const { t } = i18n;

@observer
export default class PolyfillPage extends Component {
  @computed
  get options() {
    return Object.entries(polyfillStore.index)
      .map(([key, data]) => !('polyfills' in data) && { key, label: key, data })
      .filter(Boolean) as TreeNode[];
  }

  @observable
  accessor selectOptions: TreeSelectSelectionKeysType = {};

  @computed
  get features() {
    return Object.keys(this.selectOptions);
  }

  @computed
  get polyfillURL() {
    return `${PolyfillHost}/api/polyfill?features=${this.features}`;
  }

  componentDidMount() {
    polyfillStore.getIndex();
  }

  renderContent() {
    const { options, selectOptions, features, polyfillURL } = this,
      { currentUA, sourceCode } = polyfillStore;

    return (
      <main className="d-flex flex-column gap-3 mb-3">
        <TreeSelect
          placeholder="features"
          display="chip"
          filter
          selectionMode="checkbox"
          options={options}
          value={selectOptions}
          onChange={({ value }) =>
            (this.selectOptions = value as TreeSelectSelectionKeysType)
          }
        />
        <div className="d-flex justify-content-around align-items-center">
          <DropdownButton title={textJoin(t('examples'), currentUA)}>
            {Object.entries(UserAgent).map(([name, value]) => (
              <Dropdown.Item
                key={name}
                title={value}
                onClick={() => polyfillStore.getSourceCode(name, features)}
              >
                {name}
              </Dropdown.Item>
            ))}
          </DropdownButton>

          <h1>{t('Web_polyfill_CDN')}</h1>
        </div>

        <Card body>
          <a target="_blank" href={polyfillURL} rel="noreferrer">
            {polyfillURL}
          </a>
          <hr />
          <pre>
            <code>{sourceCode}</code>
          </pre>
        </Card>
      </main>
    );
  }

  render() {
    const { downloading } = polyfillStore;

    return (
      <Container>
        <PageHead title={t('Web_polyfill_CDN')}>
          <link
            rel="stylesheet"
            href="https://unpkg.com/primereact/resources/primereact.min.css"
          />
          <link
            rel="stylesheet"
            href="https://unpkg.com/primereact/resources/themes/bootstrap4-light-blue/theme.css"
          />
        </PageHead>

        {downloading > 0 && <Loading />}

        {this.renderContent()}
      </Container>
    );
  }
}
