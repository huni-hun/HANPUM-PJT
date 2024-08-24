import { colors } from '@/styles/colorPalette';
import styled from 'styled-components';

export const InterestContainer = styled.div`
  .tab {
    height: 6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid ${colors.grey4};
    font-size: 1.6rem;
    font-weight: bold;
    &-item {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 17rem;
      box-sizing: border-box;
    }

    .active {
      border-bottom: 6px solid ${colors.main};
      color: ${colors.main};
    }
  }

  .card-container {
    width: 100%;
    height: 100%;
    margin-top: 24px;
    padding: 0 16px;
    gap: 24px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .badge {
      width: 5.5rem;
      height: 2.4rem;
      border-radius: 100px;
      border: 1px solid ${colors.white};
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: ${colors.main};
      position: absolute;
      top: 16px;
      left: 20px;
      z-index: 3;
    }

    .black-bg {
      width: 100%;
      height: 100%;
      position: absolute;
      background-color: rgba(0, 0, 0, 0.3);
      border-radius: 20px;
      top: 0;
      z-index: 2;
    }

    img {
      width: 100%;
      height: 100%;
      border-radius: 20px;
      position: absolute;
      top: 0;
      z-index: 1;
    }
  }
`;
