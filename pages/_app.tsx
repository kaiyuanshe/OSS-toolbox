import '../styles/globals.less';

import { Icon } from 'idea-react';
import { HTTPError } from 'koajax';
import { configure } from 'mobx';
import { enableStaticRendering, observer } from 'mobx-react';
import App, { AppContext } from 'next/app';
import Head from 'next/head';
import { Col, Container, Image, Row } from 'react-bootstrap';

import { MainNavigator } from '../components/MainNavigator';
import { MDXLayout } from '../components/MDXLayout';
import { isServer } from '../models/configuration';
import { createI18nStore, I18nContext, I18nProps, loadSSRLanguage } from '../models/Translation';

configure({ enforceActions: 'never' });

enableStaticRendering(isServer());

@observer
export default class CustomApp extends App<I18nProps> {
  static async getInitialProps(context: AppContext) {
    return {
      ...(await App.getInitialProps(context)),
      ...(await loadSSRLanguage(context.ctx)),
    };
  }

  i18nStore = createI18nStore(this.props.language, this.props.languageMap);

  componentDidMount() {
    window.addEventListener('unhandledrejection', ({ reason }) => {
      const { message, response } = reason as HTTPError;
      const { statusText, body } = response || {};

      const tips = body?.message || statusText || message;

      if (tips) alert(tips);
    });
  }

  render() {
    const { Component, pageProps, router } = this.props,
      { t } = this.i18nStore;

    return (
      <I18nContext.Provider value={this.i18nStore}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <MainNavigator />

        {router.route.startsWith('/article/') && !router.route.startsWith('/article/editor') ? (
          <MDXLayout title={router.route.split('/').at(-1)}>
            <Component {...pageProps} />
          </MDXLayout>
        ) : (
          <div className="mt-5 pt-4">
            <Component {...pageProps} />
          </div>
        )}

        <footer className="border-top bg-light text-secondary py-5">
          <Container>
            <Row className="align-items-center small text-center g-2">
              <Col xs={12} sm={6}>
                <a
                  className="flex-fill d-flex justify-content-center align-items-center"
                  href="https://vercel.com?utm_source=create-next-app&amp;utm_medium=default-template&amp;utm_campaign=create-next-app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('powered_by')}
                  <span className="mx-2">
                    <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
                  </span>
                </a>
              </Col>
              <Col xs={6} sm={3}>
                <a
                  target="_blank"
                  href="https://github.com/kaiyuanshe/OSS-toolbox"
                  rel="noreferrer"
                >
                  {t('source_code')}
                </a>
              </Col>
              <Col xs={6} sm={3} className="position-relative">
                <a
                  className="stretched-link"
                  target="_blank"
                  href="https://monitor.kaiyuanshe.cn/status/service"
                  rel="noreferrer"
                >
                  <Icon name="hdd-network" size={1.5} />
                </a>
              </Col>
            </Row>
          </Container>
        </footer>
      </I18nContext.Provider>
    );
  }
}
