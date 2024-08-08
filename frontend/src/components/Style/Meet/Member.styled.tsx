import { colors } from '@/styles/colorPalette';
import styled from 'styled-components';

export const MemberContainer = styled.div`
  margin-top: 8px;
  background-color: ${colors.white};
  padding: 24px 16px;

  .member-top {
    padding-left: 8px;
    display: flex;
    align-items: end;
    gap: 8px;
    margin-bottom: 16px;
    .title {
      font-size: 2rem;
      font-weight: bold;
    }
    span {
      font-size: 1.4rem;
      font-weight: bold;
      color: ${colors.grey2};
    }
  }

  .member-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    .member {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      &-img {
        width: 6rem;
        height: 6rem;
        border-radius: 50%;
        background-color: ${colors.grey1};
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      &-name {
        font-size: 1.2rem;
        font-weight: bold;
      }
    }
  }
`;
