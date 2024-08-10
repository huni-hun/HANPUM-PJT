import { colors } from '@/styles/colorPalette';
import styled from 'styled-components';

export const TermsContainer = styled.div`
  display: flex;
  flex-direction: column;

  .title {
    font-size: 2rem;
    font-weight: bold;
    color: ${colors.main};
    padding-left: 24px;
    margin: 16px 0;
  }

  .desc {
    display: flex;
    flex-direction: column;
    padding-left: 24px;
    p {
      font-size: 1.4rem;
      line-height: 22px;
    }
  }

  .apply_list {
    display: flex;
    flex-direction: column;
    gap: 32px;
    padding: 0px 24px;
    margin-top: 36px;
    .apply_item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      &-check {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        border: 1px solid ${colors.grey2};
        margin-right: 16px;
        box-sizing: border-box;
      }

      &-title {
        flex: 1;
        font-size: 1.4rem;
      }
      &-link {
        font-size: 1.2rem;
        text-decoration: underline;
        color: ${colors.grey2};
      }

      .checked {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        background-color: ${colors.main};
        margin-right: 16px;
        border: none;
      }
    }
  }

  .applyAll {
    padding: 0 16px;
    margin-top: 51px;

    .apply_item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 14px 8px;
      background-color: #f3f4f8;
      border-radius: 7px;
      &-check {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        border: 1px solid ${colors.grey2};
        margin-right: 16px;
        box-sizing: border-box;
      }
      &-title {
        flex: 1;
        font-size: 1.4rem;
        display: flex;
        align-items: end;
        span {
          font-size: 1rem;
          font-weight: bold;
          color: ${colors.grey2};
        }
        p {
          font-size: 1.6rem;
          font-weight: bold;
        }
      }

      .checked {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        background-color: ${colors.main};
        margin-right: 16px;
        border: none;
      }
    }
  }
`;
