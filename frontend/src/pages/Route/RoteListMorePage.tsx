import Header from '@/components/common/Header/Header';
import RouteListMoreCard from '@/components/Style/Route/RouteListMoreCard';
import * as R from '@/components/Style/Route/RouteListMorePage.styled';

function RouteListMorePage() {
  return (
    <R.Container>
      <Header purpose="title" clickBack={() => {}} />
      <R.MainContainer>
        <RouteListMoreCard />
      </R.MainContainer>
    </R.Container>
  );
}

export default RouteListMorePage;
