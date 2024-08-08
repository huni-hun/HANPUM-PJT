import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

import * as S from '../Style/Main/Meet.styled';
import MeetItem from './MeetItem';

function Meet() {
  return (
    <S.Container>
      <Swiper
        slidesPerView={'auto'}
        spaceBetween={8}
        pagination={{
          clickable: true,
        }}
      >
        <SwiperSlide>
          <MeetItem />
        </SwiperSlide>
        <SwiperSlide>
          <MeetItem />
        </SwiperSlide>
        <SwiperSlide>
          <MeetItem />
        </SwiperSlide>
        <SwiperSlide>
          <MeetItem />
        </SwiperSlide>
        <SwiperSlide>
          <MeetItem />
        </SwiperSlide>
      </Swiper>
    </S.Container>
  );
}

export default Meet;
