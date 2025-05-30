import { FeatureAttitude, filterLicenses, InfectionRange, License } from 'license-filter';
import { observer } from 'mobx-react';
import { FC, useContext, useEffect, useState } from 'react';
import { Accordion, Button, ButtonGroup, Container, ProgressBar } from 'react-bootstrap';

import { licenseTips, optionValue } from '../components/License/helper';
import { PageHead } from '../components/PageHead';
import { i18n, I18nContext } from '../models/Translation';

interface List {
  license: License;
  score: number;
}

const choiceSteps = [
  'popularity',
  'reuseCondition',
  'infectionIntensity',
  'infectionRange',
  'jurisdiction',
  'patentStatement',
  'patentRetaliation',
  'enhancedAttribution',
  'privacyLoophole',
  'marketingEndorsement',
] as const;

const LicenseTool: FC = observer(() => {
  const i18n = useContext(I18nContext);
  const { t } = i18n;

  const [stepIndex, setStepIndex] = useState(0);
  const [keyIndex, setKeyIndex] = useState(0);
  const [filterOption, setFilterOption] = useState({});
  const [disableChoose, setDisableChoose] = useState(false);
  const [lists, setLists] = useState<List[]>([]);

  const now = Math.ceil(100 / choiceSteps.length);

  useEffect(() => {
    if (stepIndex === choiceSteps.length) setDisableChoose(true);
  }, [stepIndex]);

  const handleChoose = (value: string | null) => {
    const choice = value ? +value : 0;
    const key = choiceSteps[keyIndex];

    const newObject = { ...filterOption, [key]: choice };
    const tempLists = filterLicenses(newObject);

    setFilterOption(newObject);

    setLists(tempLists);

    setStepIndex(stepIndex < choiceSteps.length ? stepIndex + 1 : stepIndex);

    setKeyIndex(keyIndex < choiceSteps.length - 1 ? keyIndex + 1 : keyIndex);
  };

  const backToLast = () => {
    const choice = 0;
    const key = choiceSteps[keyIndex];

    const newObject = { ...filterOption, [key]: choice };
    const tempLists = filterLicenses(newObject);

    setFilterOption(newObject);

    setStepIndex(
      stepIndex === choiceSteps.length ? stepIndex - 2 : stepIndex > 0 ? stepIndex - 1 : stepIndex,
    );
    setKeyIndex(keyIndex > 0 ? keyIndex - 1 : keyIndex);

    if (disableChoose) setDisableChoose(false);
    setLists(tempLists);
  };

  return (
    <Container className="py-5">
      <PageHead title={t('license_tool_headline')} />
      <h1>{t('license_tool_headline')}</h1>

      <p>{t('license_tool_description')}</p>
      <p className="text-warning">{t('warn_info')}</p>

      <h2>
        {t('filter_option')}: {t(choiceSteps[keyIndex])}
      </h2>

      {licenseTips(i18n)[choiceSteps[keyIndex]].map(({ text }) => (
        <p key={text}>{text}</p>
      ))}
      <ProgressBar
        className="mb-3"
        variant="info"
        now={(keyIndex + 1) * now}
        label={t('step_x', { step: keyIndex + 1 })}
      />
      <Button className="mb-2" variant="warning" onClick={backToLast}>
        {t('last_step')}
      </Button>
      <ButtonGroup className="mb-2">
        {optionValue(i18n)[choiceSteps[keyIndex]].map(({ value, text }) => (
          <Button
            key={value}
            className="mx-1"
            value={value}
            id={`tb-${value}`}
            disabled={disableChoose}
            onClick={({ currentTarget: { value } }) => handleChoose(value)}
          >
            {text}
          </Button>
        ))}
      </ButtonGroup>

      <Accordion defaultActiveKey="0">
        {lists.map(({ license, score }, index) => (
          <Accordion.Item key={license.name} eventKey={index + 1 + ''}>
            <Accordion.Header>
              {license.name} {t('license_score')}: {score * 10}
            </Accordion.Header>
            <Accordion.Body>{renderInfo(license, i18n)}</Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
});

function renderInfo({ link, feature }: License, { t }: typeof i18n) {
  const judge = (attitude: FeatureAttitude) =>
    ({
      [FeatureAttitude.Positive]: t('attitude_positive'),
      [FeatureAttitude.Negative]: t('attitude_negative'),
      [FeatureAttitude.Undefined]: t('option_undefined'),
    })[attitude] || t('option_undefined');

  const judgeInfectionRange = (infectionRange: InfectionRange | undefined) =>
    infectionRange !== undefined
      ? {
          [InfectionRange.Library]: t('range_library'),
          [InfectionRange.File]: t('range_file'),
          [InfectionRange.Module]: t('range_module'),
        }[infectionRange]
      : t('option_undefined');

  return (
    <>
      <ul>
        <li>
          {t('popularity')}: {judge(feature.popularity)}
        </li>
        <li>
          {t('reuseCondition')}: {judge(feature.reuseCondition)}
        </li>
        <li>
          {t('infectionIntensity')}: {judge(feature.infectionIntensity)}
        </li>

        <li>
          {t('infectionRange')}: {judgeInfectionRange(feature.infectionRange)}
        </li>

        <li>
          {t('jurisdiction')}: {judge(feature.jurisdiction)}
        </li>
        <li>
          {t('patentStatement')}: {judge(feature.patentStatement)}
        </li>
        <li>
          {t('patentRetaliation')}: {judge(feature.patentRetaliation)}
        </li>
        <li>
          {t('enhancedAttribution')}: {judge(feature.enhancedAttribution)}
        </li>
        <li>
          {t('privacyLoophole')}: {judge(feature.privacyLoophole)}
        </li>
        <li>
          {t('marketingEndorsement')}: {judge(feature.marketingEndorsement)}
        </li>
      </ul>
      <Button size="sm" target="_blank" href={link}>
        {t('license_detail')}
      </Button>
    </>
  );
}

export default LicenseTool;
