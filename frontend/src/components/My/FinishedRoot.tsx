import React from 'react';
import * as S from '../Style/My/FinishedRoot.styled';
import RootCard from '../RootCard';

function FinishedRoot() {
  return (
    <S.FinishedRootContainer>
      <div className="card-list">
        <RootCard />
        <RootCard />
      </div>
    </S.FinishedRootContainer>
  );
}

export default FinishedRoot;
