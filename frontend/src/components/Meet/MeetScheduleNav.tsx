import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

import * as S from '../Style/Meet/MeeetScheduleNav.styled';

function MeetScheduleNav() {
  return (
    <S.MeetScheduleNav>
      <div className="day-box">
        <Swiper
          slidesPerView={'auto'}
          spaceBetween={8}
          pagination={{
            clickable: true,
          }}
        >
          <SwiperSlide>
            <div className="day active">Day 1</div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="day">Day 2</div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="day">Day 3</div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="day">Day 4</div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="day">Day 5</div>
          </SwiperSlide>
        </Swiper>
      </div>
    </S.MeetScheduleNav>
  );
}

export default MeetScheduleNav;
