import { SignupInfo } from '@/models/signup';
import * as S from '../Style/Signup/Terms.styled';
import Flex from '../common/Flex';
import Text from '../common/Text';
import { APPLY } from '@/constants';
import { MouseEvent, useState } from 'react';
import { colors } from '@/styles/colorPalette';

function Terms({
  signupValue,
  clickNext,
}: {
  signupValue: SignupInfo;
  clickNext: () => void;
}) {
  // 약관 동의 체크를 위한 객체
  // {01: false, 02: false, 03: true}
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

  // 모두 체크되었는지 확인하고 true, false로 반환
  const isAllCheck = Object.values(termsAgreements).every((allTrue) => allTrue);

  // 필수약관 모두 체크되었는지
  const isEssentialCheck = Object.entries(termsAgreements)
    .filter(([key]) => key !== '03')
    .every(([, value]) => value);

  console.log('isAllCheck ::', isAllCheck);

  // 전체 동의 누르는 함수
  const handleAllAgree = (
    _: MouseEvent<HTMLElement>,
    checked: boolean,
  ): void => {
    setTermsAgreements((prevTerms) => {
      return Object.keys(prevTerms).reduce(
        (prev, key) => ({
          ...prev,
          [key]: checked,
        }),
        {},
      );
    });
  };

  // 개별적으로 동의 누르는 함수
  const handleAgree = (id: string, checked: boolean): void => {
    setTermsAgreements((prevTerms) => ({
      ...prevTerms,
      [id]: checked,
    }));
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

      <div className="applyAll ">
        <div className="apply_item">
          <div
            className={`apply_item-check ${isAllCheck ? 'checked' : ''}`}
            onClick={(e) => handleAllAgree(e, !isAllCheck)}
          />
          <div className="apply_item-title">
            <p className="apply_item-title-bold">전체 동의</p>
            <span>(선택항목 포함)</span>
          </div>
        </div>
      </div>

      <div className="apply_list ">
        {APPLY.map((apply) => (
          <div className="apply_item" key={apply.id}>
            <div
              className={`apply_item-check ${termsAgreements[apply.id] ? 'checked' : ''}`}
              onClick={() => handleAgree(apply.id, !termsAgreements[apply.id])}
            />
            <div className="apply_item-title">{apply.title}</div>
            <div className="apply_item-link">보기</div>
          </div>
        ))}
      </div>

      {/* TODO FixedBottom 생성 후 disable props 추가 */}
      <div
        className="btn"
        style={{
          backgroundColor: isEssentialCheck ? colors.main : undefined,
        }}
        onClick={() => (isEssentialCheck ? clickNext() : '')}
      >
        동의하고 시작하기
      </div>
    </S.TermsContainer>
  );
}

export default Terms;
