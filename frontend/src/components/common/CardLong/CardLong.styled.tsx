import { colors } from '@/styles/colorPalette';
import styled from 'styled-components';

export const CardLongContainer = styled.div`
  position: relative;
  width: 100%;
  height: 16rem;
  border-radius: 20px;
  box-sizing: border-box;
  overflow: hidden;
  .card {
    width: 100%;
    height: 100%;
    position: re;
    .info-box {
      position: absolute;
      left: 16px;
      bottom: 20px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      z-index: 3;

      .review {
        display: flex;
        gap: 3px;
        align-items: center;
      }

      .info-root {
        display: flex;
        gap: 4px;
        align-items: center;

        .line {
          width: 0.1rem;
          height: 1rem;
          background-color: ${colors.white};
          margin-left: 3px;
        }
      }
    }

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

  .delete-bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: end;
    justify-content: center;
  }
`;
