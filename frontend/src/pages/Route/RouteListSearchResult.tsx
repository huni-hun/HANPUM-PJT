import Header from '@/components/common/Header/Header';
import Icon from '@/components/common/Icon/Icon';
import BottomSheet from '@/components/Style/Route/BottomSheet';
import RouteListMoreCard from '@/components/Style/Route/RouteListMoreCard';
import * as R from '@/components/Style/Route/RouteListMorePage.styled';
import { RouteListProps } from '@/models/route';
import { useState } from 'react';

interface RouteListSearchResultProps {
  keyword: string;
  setSearchSucess: React.Dispatch<React.SetStateAction<boolean>>;
  searchResult: RouteListProps[];
}

function RouteListSearchResult(props: RouteListSearchResultProps) {
  const [reviewType, setReviewType] = useState<string>('최신순');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <R.Container>
      <Header
        back={true}
        purpose="search"
        clickBack={() => {
          props.setSearchSucess(false);
        }}
        searchValue={props.keyword}
      />
      <R.RouteTypeContainer>
        <R.ReviewHeaderTextBox
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <R.ReviewHeaderText>{reviewType}</R.ReviewHeaderText>
          <div
            style={{
              transform: 'rotate(270deg)',
              marginLeft: '0.3rem',
            }}
          >
            <Icon name="IconBackArrow" size={10} />
          </div>
        </R.ReviewHeaderTextBox>
      </R.RouteTypeContainer>
      <R.MainContainer>
        {props.searchResult.map((ele: RouteListProps) => (
          <RouteListMoreCard
            title={ele.routeName}
            start={ele.start}
            end={ele.end}
            score={ele.routeScore}
            review={ele.routeComment}
            img={ele.img}
          />
        ))}
      </R.MainContainer>
      {isOpen && (
        <BottomSheet
          selected={reviewType}
          setSelected={setReviewType}
          bsType={'정렬'}
          setIsOpen={setIsOpen}
        />
      )}
    </R.Container>
  );
}

export default RouteListSearchResult;
