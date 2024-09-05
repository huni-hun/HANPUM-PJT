import Flex from '@/components/common/Flex';
import Header from '@/components/common/Header/Header';
import Text from '@/components/common/Text';
import TextLineBreaks from '@/components/common/TextLineBreaks';
import TermsText from '@/components/My/config/TermsText';
import { ANNOUNCEMENT, POLICY } from '@/constants';
import { colors } from '@/styles/colorPalette';
import { returnConfigTitle } from '@/utils/util';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

type ConfigType = 'announcement' | 'policy' | 'withdraw' | 'pw';

function ConfigDetailPage() {
  const navigate = useNavigate();
  const { category, id } = useParams();
  const paramCategory = category?.split(':')[1] as ConfigType;

  const configInfoList = () => {
    if (paramCategory === 'announcement') {
      return ANNOUNCEMENT;
    } else if (paramCategory === 'policy') {
      return POLICY;
    }
    return [];
  };

  console.log(paramCategory, id);

  const filteredData = configInfoList().filter((item) => item.id === id);
  console.log(filteredData);

  const renderAnnouncement = () =>
    filteredData.map((announcement) => (
      <Flex key={announcement.id} direction="column">
        <Text $typography="t20" $bold={true}>
          {announcement.title}
        </Text>
        <Text
          $typography="t12"
          color="grey2"
          style={{ margin: '6px 0px 28px' }}
        >
          {announcement.date}
        </Text>
        <p>
          <TextLineBreaks>{announcement.desc || ''}</TextLineBreaks>
        </p>
      </Flex>
    ));

  const renderPolicy = () => {
    if (id === '01') {
      return <TermsText />;
    }
    if (id === '02') {
      return <div>개인정보</div>;
    }
  };

  return (
    <ConfigDetailPageContainer>
      <Header
        purpose="title"
        title={returnConfigTitle(paramCategory)}
        clickBack={() => {
          navigate(-1);
        }}
      />

      <div className="container">
        {paramCategory === 'announcement' && renderAnnouncement()}
        {paramCategory === 'policy' && renderPolicy()}
      </div>
    </ConfigDetailPageContainer>
  );
}

export default ConfigDetailPage;

const ConfigDetailPageContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${colors.white};

  .container {
    padding: 20px 29px 20px 24px;
    background-color: ${colors.white};
    p {
      font-size: 1.4rem;
    }
  }
`;
