import { CodeBlock, Loading } from 'idea-react';
import { textJoin } from 'mobx-i18n';
import { observer } from 'mobx-react';
import { ObservedComponent } from 'mobx-react-helper';
import { SearchableInput } from 'mobx-restful-table';
import { FormEvent } from 'react';
import { Card, Container, Dropdown, DropdownButton } from 'react-bootstrap';
import { formToJSON } from 'web-utility';

import { PageHead } from '../components/PageHead';
import { UserAgent } from '../models/configuration';
import polyfillStore from '../models/Polyfill';
import { i18n, I18nContext } from '../models/Translation';

@observer
export default class PolyfillPage extends ObservedComponent<{}, typeof i18n> {
  static contextType = I18nContext;

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { features } = formToJSON<{ features: string[] }>(event.currentTarget),
      { submitter } = event.nativeEvent as SubmitEvent;

    polyfillStore.getSourceCode(submitter!.textContent!.trim(), features);
  };

  renderContent() {
    const { currentUA, polyfillURL, sourceCode } = polyfillStore,
      i18n = this.observedContext;
    const { t } = i18n;

    return (
      <form className="d-flex flex-column gap-3 mb-3" onSubmit={this.handleSubmit}>
        <header className="d-flex justify-content-around align-items-center">
          <h1>{t('Web_polyfill_CDN')}</h1>

          <DropdownButton title={textJoin(t('select_compatible_browser'), currentUA)}>
            {Object.entries(UserAgent).map(([name, value]) => (
              <Dropdown.Item key={name} title={value} as="button" type="submit">
                {name}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </header>

        <SearchableInput
          translator={i18n}
          store={polyfillStore}
          labelKey="name"
          valueKey="name"
          name="features"
          placeholder={t('search_feature')}
          onChange={console.info}
        />
        <Card body>
          <a target="_blank" href={polyfillURL} rel="noreferrer">
            {polyfillURL}
          </a>
          <hr />
          <CodeBlock className="vh-100 overflow-auto" language="javascript">
            {sourceCode}
          </CodeBlock>
        </Card>
      </form>
    );
  }

  render() {
    const { t } = this.observedContext,
      { downloading } = polyfillStore;

    return (
      <Container>
        <PageHead title={t('Web_polyfill_CDN')}>
          <link rel="stylesheet" href="https://unpkg.com/prismjs@1.30.0/themes/prism.min.css" />
        </PageHead>

        {downloading > 0 && <Loading />}

        {this.renderContent()}
      </Container>
    );
  }
}
