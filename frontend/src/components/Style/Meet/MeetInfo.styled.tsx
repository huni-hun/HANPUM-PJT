import { colors } from '@/styles/colorPalette';
import styled from 'styled-components';

export const MeetInfoContainer = styled.div`
  background-color: ${colors.white};
  .section {
    border-bottom: 1px solid #e0e0e0;
    &_user {
      display: flex;
      align-items: center;
      gap: 18px;
      padding: 16px 20px 12px;
      &-userImg {
        width: 5rem;
        height: 5rem;
        background-color: #d9d9d9;
        border-radius: 50%;
        img {
          width: 100%;
          height: 100%;
        }
      }

      &-name {
        font-weight: bold;
        font-size: 1.6rem;
      }
    }

    &_course {
      padding: 30px 24px;
      display: flex;
      flex-direction: column;
      &-title {
        margin-bottom: 12px;
        font-weight: bold;
        font-size: 2rem;
      }
      &-desc {
        font-size: 1.4rem;
        padding-bottom: 78px;
      }
    }

    &_meetInfo {
      display: flex;
      flex-direction: column;
      padding: 24px;
      &-title {
        font-weight: bold;
        font-size: 2rem;
        margin-bottom: 16px;
      }
      &-detail {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        &-date {
          display: flex;
          flex-direction: column;
          gap: 10px;
          &-flex {
            display: flex;
            gap: 11px;
            align-items: center;
            &-label {
              font-size: 1rem;
            }
            &-day {
              font-size: 1.2rem;
            }
          }
        }

        &-total {
          display: flex;
          flex-direction: column;
          gap: 5px;
          color: #a0a0a0;
          &-label {
            font-weight: bold;
            font-size: 1.2rem;
          }
          &-value {
            font-size: 1rem;
          }
        }
      }
      .start:nth-of-type(3) {
        margin-top: 24px;
      }

      &_items {
        display: flex;
        gap: 12px;
        margin-top: 22px;

        &-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }
      }
    }
  }
`;
