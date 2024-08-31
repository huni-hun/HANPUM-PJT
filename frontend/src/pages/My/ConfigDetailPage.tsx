import Flex from '@/components/common/Flex';
import Header from '@/components/common/Header/Header';
import Text from '@/components/common/Text';
import TextLineBreaks from '@/components/common/TextLineBreaks';
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
  // console.log(param.id);
  // console.log(ANNOUNCEMENT.filter((item) => item.id === param.id));

  const configInfoList = () => {
    if (paramCategory === 'announcement') {
      return ANNOUNCEMENT;
    } else if (paramCategory === 'policy') {
      return POLICY;
    }
    return [];
  };

  const filteredData = configInfoList().filter((item) => item.id === id);

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
        {filteredData.map((category) => (
          <Flex key={category.id} direction="column">
            <Text $typography="t20" $bold={true}>
              {category.title}
            </Text>
            <Text
              $typography="t12"
              color="grey2"
              style={{ margin: '6px 0px 28px' }}
            >
              {category.date}
            </Text>
            <p>
              <TextLineBreaks>{category.desc}</TextLineBreaks>
            </p>
          </Flex>
        ))}
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
    p {
      font-size: 1.4rem;
    }
  }
`;
