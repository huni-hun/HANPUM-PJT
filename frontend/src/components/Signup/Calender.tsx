import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import Flex from '../common/Flex';
import Text from '../common/Text';
import * as S from '../Style/Signup/Calender.styled';

import { Datepicker, localeKo } from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';

function Calender({ onChange }: { onChange: (date: string) => void }) {
  const today = new Date();

  const handleDateChange = (event: any) => {
    const { value } = event;
    const date = new Date(value);

    // 31을 택했을 때 30일로 되는 이슈(타임존)
    const localDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000,
    );
    // onChange(date); // 선택된 날짜를 부모 컴포넌트로 전달
    // ISO 8601로 변환 현재 2024-08-31T00:00:00.000Z
    const isoString = localDate.toISOString();
    onChange(isoString);
  };

  return (
    <S.CalenderContainer>
      <div className="calender">
        <div className="calender-header">
          <Text color="main" $typography="t10">
            년
          </Text>
          <Text color="main" $typography="t10">
            월
          </Text>
          <Text color="main" $typography="t10">
            일
          </Text>
        </div>
        <div className="calender-body">
          <Datepicker
            theme="ios"
            min="1970-01-01"
            max={`${today.getFullYear()}-12-31`}
            controls={['date']}
            display="inline"
            touchUi={true}
            locale={localeKo}
            onChange={handleDateChange}
          />
        </div>
      </div>
    </S.CalenderContainer>
  );
}

export default Calender;
