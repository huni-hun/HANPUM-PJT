import React, { useState } from 'react';
import * as S from '../Style/My/Interest.styled';
import NoHave from './NoHave';

function Interest() {
  const [tab, setTab] = useState('경로');

  const setTabvalue = (e: React.MouseEvent<HTMLElement>) => {
    setTab(e.currentTarget.innerText);
  };

  const root = [];
  const meet = [];

  return (
    <S.InterestContainer>
      <div className="tab">
        <div
          className={`tab-item ${tab === '경로' ? 'active' : ''}`}
          onClick={(e) => setTabvalue(e)}
        >
          경로
        </div>
        <div
          className={`tab-item ${tab === '모임' ? 'active' : ''}`}
          onClick={(e) => setTabvalue(e)}
        >
          모임
        </div>
      </div>

      {/*  경로 */}
      {tab === '경로' && root.length === 0 && <NoHave category="root" />}

      {/*  모임 */}
      {tab === '모임' && meet.length === 0 && <NoHave category="meet" />}
    </S.InterestContainer>
  );
}

export default Interest;
