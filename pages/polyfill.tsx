import { Loading } from 'idea-react';
import { computed, observable } from 'mobx';
import { textJoin } from 'mobx-i18n';
import { observer } from 'mobx-react';
import { compose, translator } from 'next-ssr-middleware';
import { Tree, TreeCheckboxSelectionKeys } from 'primereact/tree';
import { TreeNode } from 'primereact/treenode';
import { Component } from 'react';
import {
  Accordion,
  Card,
  Container,
  Dropdown,
  DropdownButton,
} from 'react-bootstrap';

import { PageHead } from '../components/PageHead';
import polyfillStore from '../models/Polyfill';
import { i18n } from '../models/Translation';
import { PolyfillHost, UserAgent } from './api/polyfill';

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
  accessor selectOptions: TreeCheckboxSelectionKeys = {};

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
        <header className="d-flex justify-content-around align-items-center">
          <h1>{t('Web_polyfill_CDN')}</h1>

          <DropdownButton
            title={textJoin(t('selectCompatibleBrowser'), currentUA)}
          >
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
        </header>

        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>{t('features')}</Accordion.Header>
            <Accordion.Body>
              <Tree
                filterPlaceholder={t('searchFeature')}
                filter
                selectionMode="checkbox"
                value={options}
                selectionKeys={selectOptions}
                onSelectionChange={({ value }) =>
                  (this.selectOptions = value as TreeCheckboxSelectionKeys)
                }
              />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <Card body>
          <a target="_blank" href={polyfillURL} rel="noreferrer">
            {polyfillURL}
          </a>
          <hr />
          <pre className="vh-100 overflow-auto">
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
