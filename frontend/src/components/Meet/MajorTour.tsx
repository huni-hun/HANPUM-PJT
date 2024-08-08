import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

import * as S from '../Style/Meet/MajorTour.styled';
import img from '../../assets/img/mountain.jpg';
import Icon from '../common/Icon/Icon';

function MajorTour() {
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
        <SwiperSlide>
          <div className="item">
            <img src={img} alt="" />
            <div className="place">제주도</div>
            <div className="place_detail">
              <Icon name="IconFlagBold" size={15} />
              <span>모슬포항</span>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="item">
            <img src={img} alt="" />
            <div className="place">제주도</div>
            <div className="place_detail">
              <Icon name="IconFlagBold" size={15} />
              <span>모슬포항</span>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="item">
            <img src={img} alt="" />
            <div className="place">제주도</div>
            <div className="place_detail">
              <Icon name="IconFlagBold" size={15} />
              <span>모슬포항</span>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="item">
            <img src={img} alt="" />
            <div className="place">제주도</div>
            <div className="place_detail">
              <Icon name="IconFlagBold" size={15} />
              <span>모슬포항</span>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </S.MajorTourContainer>
  );
}

export default MajorTour;
