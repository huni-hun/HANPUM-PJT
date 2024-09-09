import Icon from '../../components/common/Icon/Icon';
import * as Ra from '../../components/Style/Route/RouteAddPagePlace.styled';
import * as S from '../../components/Style/Schedule/ScheduleMemo.styled';
import Button from '../../components/common/Button/Button';
import Map from '../../components/common/Map/Map';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '@/components/common/Header/Header';
import {
  AttractionsAddCardProps,
  AttractionReqDto,
  CourseDayReqDto,
  searchPlaceProps,
  WayPointReqDto,
} from '@/models/route';
import { toast } from 'react-toastify';
import { ScheduleAttractionsProps } from '@/models/schdule';
import { useState } from 'react';

interface RouteAddPagePlaceProps {
  selectedPlace?: searchPlaceProps;
  setSearchOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setPageOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setWayPoints?: React.Dispatch<React.SetStateAction<WayPointReqDto[]>>;
  wayPoints?: WayPointReqDto[];
  setDateDetail?: React.Dispatch<React.SetStateAction<CourseDayReqDto[]>>;
  dateDetail?: CourseDayReqDto[];
  day?: number;
  setAttractions?: React.Dispatch<React.SetStateAction<AttractionReqDto[]>>;
  attractions?: AttractionReqDto[];
  pointType?: string;
  setAttractionsCard?: React.Dispatch<
    React.SetStateAction<AttractionsAddCardProps[]>
  >;
  attractionsCard?: AttractionsAddCardProps[];
  keyword?: string;
}

// const [meetRequest, setMeetRequest] = useState<ScheduleAttractionsProps>();

function ScheduleMemoPage(props: RouteAddPagePlaceProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const { attractionIndex, attractionsCard } = location.state as {
    attractionIndex: number;
    attractionsCard: ScheduleAttractionsProps[];
  };

  const handleSetPageOpen = () => {
    if (props?.setPageOpen) {
      props.setPageOpen(false);
    }
  };

  const handleSetSearchOpen = () => {
    if (props?.setSearchOpen) {
      props.setSearchOpen(false);
    }
  };

  // Call handlers
  handleSetPageOpen();
  handleSetSearchOpen();

  const selectedAttraction = attractionsCard[attractionIndex];

  return (
    <Ra.Container>
      <Header
        purpose="result"
        title={props?.selectedPlace?.placeName}
        clickBack={() => navigate(-1)}
      />
      <Ra.MapContainer>
        <Map
          latitude={props?.selectedPlace?.latitude || 0}
          longitude={props?.selectedPlace?.longitude || 0}
        />
      </Ra.MapContainer>
      <Ra.PlaceBottomContainer>
        <S.Container>
          {selectedAttraction ? (
            <>
              <S.AttractionCard>
                <div className="img_wrap">
                  <img
                    src={selectedAttraction.image1}
                    alt={selectedAttraction.title}
                  />
                </div>
                <div className="text_wrap">
                  <h3>{selectedAttraction.title}</h3>
                  <p>tel : {selectedAttraction.tel || '-'}</p>
                  <p>{selectedAttraction.address}</p>
                </div>
              </S.AttractionCard>
              <S.InputWrap>
                {/* <textarea
                  placeholder="내용을 작성해 주세요."
                  name="description"
                  value={?.description || ''}
                  onChange={handleInfoChange}
                /> */}
              </S.InputWrap>
            </>
          ) : (
            <p>관광지 정보가 없습니다.</p>
          )}
        </S.Container>
      </Ra.PlaceBottomContainer>
    </Ra.Container>
  );
}

export default ScheduleMemoPage;
