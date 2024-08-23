import { colors } from '@/styles/colorPalette';
import styled from 'styled-components';
import { alertStateAtom } from '@/atoms/alertStateAtom';

export const MyRootContainer = styled.div`
  padding: 0 16px;

  .card-list {
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    .card {
      width: 100%;
      box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0.15);
      position: relative;
      padding: 24px 20px;
      box-sizing: border-box;
      border-radius: 12px;
      &-top {
        display: flex;
        &-img {
          width: 10.9rem;
          height: 8.2rem;
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 24px;
          margin-right: 17px;
          img {
            width: 100%;
            height: 100%;
          }
          .card-progress {
            position: absolute;
            left: 20px;
            top: 15px;
            width: 4.3rem;
            height: 2.4rem;
            border-radius: 6px;
            background-color: ${colors.black};
            color: ${colors.white};
            font-size: 1.2rem;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
        &-info {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin-bottom: 24px;

          .detail-info {
            display: flex;
            flex-direction: column;
            gap: 4px;
          }
        }
      }
      &-bottom {
        display: flex;
        justify-content: center;
        /* align-items: center; */
      }
      svg {
        position: absolute;
        right: 16px;
        top: 16px;
      }
    }
  }
`;
