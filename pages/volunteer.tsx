import { Contributor } from 'mobx-github';
import { observer } from 'mobx-react';
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

const Organizer: FC<InferGetServerSidePropsType<typeof getServerSideProps>> =
  observer(({ contributors }) => (
    <Container>
      <PageHead title={t('volunteer')} />
      <h1 className="py-5 text-center text-md-start ps-md-4">
        {t('volunteer')}
      </h1>

      <section className="d-flex justify-content-around align-items-center gap-3 flex-wrap mb-5">
        <a
          className="d-block"
          href="https://next.ossinsight.io/widgets/official/compose-org-participants-roles-ratio?owner_id=11659327&period=past_28_days"
          target="_blank" rel="noreferrer"
        >
          <picture>
            <source
              media="(prefers-color-scheme: dark)"
              srcSet="https://next.ossinsight.io/widgets/official/compose-org-participants-roles-ratio/thumbnail.png?owner_id=11659327&period=past_28_days&image_size=5x5&color_scheme=dark"
              width="465"
            />
            <img
              alt="Participants roles of KaiYuanShe"
              src="https://next.ossinsight.io/widgets/official/compose-org-participants-roles-ratio/thumbnail.png?owner_id=11659327&period=past_28_days&image_size=5x5&color_scheme=light"
              width="465"
            />
          </picture>
        </a>
        <a
          className="d-block"
          href="https://next.ossinsight.io/widgets/official/compose-org-engagement-scatter?owner_id=11659327&period=past_28_days"
          target="_blank" rel="noreferrer"
        >
          <picture>
            <source
              media="(prefers-color-scheme: dark)"
              srcSet="https://next.ossinsight.io/widgets/official/compose-org-engagement-scatter/thumbnail.png?owner_id=11659327&period=past_28_days&image_size=5x5&color_scheme=dark"
              width="465"
            />
            <img
              alt="Most engaged people of KaiYuanShe"
              src="https://next.ossinsight.io/widgets/official/compose-org-engagement-scatter/thumbnail.png?owner_id=11659327&period=past_28_days&image_size=5x5&color_scheme=light"
              width="465"
            />
          </picture>
        </a>
      </section>

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
  ));

export default Organizer;
