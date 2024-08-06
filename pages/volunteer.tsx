import { Contributor } from 'mobx-github';
import { InferGetServerSidePropsType } from 'next';
import { cache, compose, errorLogger } from 'next-ssr-middleware';
import { FC } from 'react';
import { Container, Row } from 'react-bootstrap';

import { PageHead } from '../components/PageHead';
import { PersonCard } from '../components/PersonCard';
import { SectionTitle } from '../components/SectionTitle';
import { GitRepositoryModel } from '../models/Repository';
import * as cityData from './api/city';

export const getServerSideProps = compose(cache(), errorLogger, async () => {
  const organizers = Object.values(cityData).flatMap(
    ({ organizers }) => organizers || [],
  );
  const contributors: Contributor[] =
    // @ts-ignore
    await new GitRepositoryModel().getAllContributors();

  return { props: { organizers, contributors } };
});

const Organizer: FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  organizers,
  contributors,
}) => (
  <Container>
    <PageHead title="志愿者" />
    <h1 className="py-5 text-center text-md-start ps-md-4">志愿者</h1>

    <SectionTitle count={contributors.length}>线上开源志愿者</SectionTitle>
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
