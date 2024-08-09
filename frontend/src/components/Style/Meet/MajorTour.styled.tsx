import { colors } from '@/styles/colorPalette';
import styled from 'styled-components';

export const MajorTourContainer = styled.div`
  margin-top: 8px;
  background-color: ${colors.white};
  padding: 24px 0 28px 16px;

  .title {
    font-size: 2rem;
    font-weight: bold;
    padding-left: 8px;
    margin-bottom: 16px;
  }

  .swiper-slide {
    width: 10rem !important;
    height: 10rem !important;
  }

  .item {
    width: 10rem;
    height: 10rem;
    border-radius: 12px;
    position: relative;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
    .place {
      color: ${colors.white};
      font-size: 1rem;
      position: absolute;
      top: 5px;
      left: 8px;
    }
    .place_detail {
      position: absolute;
      bottom: 8px;
      left: 8px;
      color: ${colors.white};
      font-size: 1.6rem;
      font-weight: bold;
      display: flex;
      align-items: center;
      gap: 4px;
    }
  }
`;
