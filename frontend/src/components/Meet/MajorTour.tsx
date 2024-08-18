import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

import * as S from '../Style/Meet/MajorTour.styled';

import Icon from '../common/Icon/Icon';

interface MajorTourProps {
  majorTourData: {
    id: number;
    place: string;
    detail: string;
    img: string;
  }[];
}

function MajorTour({ majorTourData }: MajorTourProps) {
  return (
    <S.MajorTourContainer>
      <div className="title">주요관광지</div>
      <Swiper
        slidesPerView={'auto'}
        spaceBetween={4}
        pagination={{
          clickable: true,
        }}
      >
        {majorTourData.map((tour) => (
          <SwiperSlide key={tour.id}>
            <div className="item">
              <img src={tour.img} alt={tour.place} />
              <div className="place">{tour.place}</div>
              <div className="place_detail">
                <Icon name="IconFlagBold" size={15} />
                <span>{tour.detail}</span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </S.MajorTourContainer>
  );
}

export default MajorTour;
