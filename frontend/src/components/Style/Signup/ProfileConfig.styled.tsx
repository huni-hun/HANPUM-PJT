import { colors } from '@/styles/colorPalette';
import styled from 'styled-components';

export const ProfileConfigContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 24px;
  padding-bottom: 10vh;

  background-color: ${colors.white};

  .profile {
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;
    &-prev_img {
      margin-top: 12px;
      width: 10.3rem;
      height: 10.3rem;
      border-radius: 50%;
      background-color: ${colors.grey1};
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        background-color: pink;
      }
    }

    &-icon_box {
      width: 3.4rem;
      height: 3.4rem;
      border: 1px solid ${colors.white};
      background-color: ${colors.main};
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      position: relative;
      top: -33px;
      right: -33px;
      svg {
        transform: translate(2px, -1px);
      }
      input {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
      }
    }
  }

  .gender {
    margin-bottom: 24px;
    &_list {
      margin-top: 17px;
      display: flex;
      justify-content: space-between;
      gap: 10px;
      background-color: ${colors.grey5};
      height: 4.8rem;
      border-radius: 7px;
      align-items: center;
      &-item {
        width: 9.5rem;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${colors.grey2};
        font-size: 1.2rem;
        font-weight: bold;
        border-radius: 7px;
      }
      .active {
        border: 1px solid ${colors.main};
        box-sizing: border-box;
        color: ${colors.main};
        background-color: ${colors.white};
      }
    }
  }
`;
