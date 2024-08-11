import Icon from '@/components/common/Icon/Icon';
import * as R from '@/components/Style/Route/SearchPlacePage.styled';

function SearchPlacePage() {
  return (
    <R.Container>
      <R.Header>
        <R.HeaderButton>
          <Icon name="IconBack" size={20} />
        </R.HeaderButton>
        <R.InputContainer>
          <R.Input placeholder="장소 이름, 주소로 검색해보세요." />
        </R.InputContainer>
      </R.Header>
      <R.MainContainer></R.MainContainer>
    </R.Container>
  );
}

export default SearchPlacePage;
