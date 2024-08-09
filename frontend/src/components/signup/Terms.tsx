import { signupInfo } from '@/models/signup';
import * as S from '../Style/Signup/Terms.styled';
import Flex from '../common/Flex';
import Text from '../common/Text';
import { APPLY } from '@/constants';
import { useState } from 'react';

function Terms({ signupValue }: { signupValue: signupInfo }) {
  // 약관 동의 체크를 위한 객체
  const [termsAgreements, setTermsAgreements] = useState(() => {
    return APPLY.reduce<Record<string, boolean>>(
      (prev, term) => ({
        ...prev,
        [term.id]: false,
      }),
      {},
    );
  });

  const activeClass = (step: number) => {
    return step === signupValue.currStep ? '-active' : '';
  };

  return (
    <S.TermsContainer>
      <div className="pagenation">
        {Array.from({ length: signupValue.totalStep }, (_, index) => (
          <div key={index} className={`page${activeClass(index)}`} />
        ))}
      </div>

      <div className="title">한품 시작하기</div>

      <div className="desc">
        <p>한품 서비스 이용을 위해</p>
        <p>이용약관에 동의가 필요합니다.</p>
      </div>

      <div className="apply_list">
        {APPLY.map((apply) => (
          <div className="apply_item" key={apply.id}>
            <div className="apply_item-check" />
            <div className="apply_item-title">{apply.title}</div>
            <div className="apply_item-link">보기</div>
          </div>
        ))}
      </div>
    </S.TermsContainer>
  );
}

export default Terms;
