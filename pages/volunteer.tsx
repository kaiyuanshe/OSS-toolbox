import { Contributor } from 'mobx-github';
import { InferGetServerSidePropsType } from 'next';
import { cache, compose, errorLogger } from 'next-ssr-middleware';
import { FC } from 'react';
import { Container, Row } from 'react-bootstrap';

import { PageHead } from '../components/PageHead';
import { PersonCard } from '../components/PersonCard';
import { SectionTitle } from '../components/SectionTitle';
import { repositoryStore } from '../models/Repository';
import { i18n } from '../models/Translation';

const { t } = i18n;

export const getServerSideProps = compose(cache(), errorLogger, async () => {
  const contributors: Contributor[] =
    await repositoryStore.getAllContributors();
  return { props: { contributors } };
});

const Organizer: FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  contributors,
}) => (
  <Container>
    <PageHead title={t('volunteer')} />
    <h1 className="py-5 text-center text-md-start ps-md-4">{t('volunteer')}</h1>

    <SectionTitle count={contributors.length}>
      {t('online_volunteer')}
    </SectionTitle>
    <Row
      as="ul"
      className="list-unstyled justify-content-center text-center"
      xs={2}
      sm={5}
      md={6}
    >
      {contributors.map(({ login, html_url, contributions }) => (
        <PersonCard
          key={login}
          name={login!}
          avatar={`https://github.com/${login}.png`}
          link={html_url}
          count={contributions}
        />
      ))}
    </Row>
  </Container>
);

export default Organizer;
