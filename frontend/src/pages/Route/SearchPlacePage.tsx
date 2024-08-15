import Icon from '@/components/common/Icon/Icon';
import * as R from '@/components/Style/Route/SearchPlacePage.styled';
import { useState } from 'react';

function SearchPlacePage() {
  const [searchText, setSearchText] = useState<string>('');

  return (
    <R.Container>
      <R.Header>
        <R.HeaderButton>
          <Icon name="IconBack" size={20} />
        </R.HeaderButton>
        <R.InputContainer>
          <R.Input
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            placeholder="장소 이름, 주소로 검색해보세요."
          />
        </R.InputContainer>
      </R.Header>
      <R.MainContainer></R.MainContainer>
    </R.Container>
  );
}

export default SearchPlacePage;
