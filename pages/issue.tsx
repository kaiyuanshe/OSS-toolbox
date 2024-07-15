import { Loading } from 'idea-react';
import { RepositoryModel } from 'mobx-github';
import { observer } from 'mobx-react';
import { ScrollList } from 'mobx-restful-table';
import { InferGetServerSidePropsType } from 'next';
import { compose, translator } from 'next-ssr-middleware';
import { FC } from 'react';
import { Breadcrumb, Container, Row } from 'react-bootstrap';

import { IssueModule } from '../components/Git/Issue/IssueModule';
import { PageHead } from '../components/PageHead';
import { repositoryStore } from '../models/Repository';
import { i18n } from '../models/Translation';

export const getServerSideProps = compose(translator(i18n), async () => {
  const list = await new RepositoryModel('kaiyuanshe').getList({
    relation: ['issues'],
  });
  return { props: { list } };
});

const { t } = i18n;

const IssuesPage: FC<InferGetServerSidePropsType<typeof getServerSideProps>> =
  observer(({ list }) => (
    <Container className="py-5">
      <PageHead title="GitHub issues" />
      <Breadcrumb>
        <Breadcrumb.Item href="/">
          {t('open_source_treasure_box')}
        </Breadcrumb.Item>
        <Breadcrumb.Item active>GitHub issues</Breadcrumb.Item>
      </Breadcrumb>
      <h1>GitHub issues</h1>

      {repositoryStore.downloading > 0 && <Loading />}

      <ScrollList
        translator={i18n}
        store={repositoryStore}
        filter={{
          relation: ['issues'],
        }}
        defaultData={list}
        renderList={allItems => (
          <Row as="ul" className="list-unstyled g-4">
            {allItems.map(
              repository =>
                !repository.archived &&
                repository.issues?.[0] && (
                  <IssueModule key={repository.name} {...repository} />
                ),
            )}
          </Row>
        )}
      />
    </Container>
  ));

export default IssuesPage;
