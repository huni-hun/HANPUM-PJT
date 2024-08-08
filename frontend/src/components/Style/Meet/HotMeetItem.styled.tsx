import { colors } from '@/styles/colorPalette';
import styled from 'styled-components';

export const ItemContainer = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  background-color: ${colors.white};
  width: 16rem;
  cursor: pointer;
  .meet-img {
    width: 100%;
    height: 16rem;
    margin-bottom: 7px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 12px;
    }
  }

  .meet-date {
    width: 4.5rem;
    height: 1.5rem;
    border: 1px solid ${colors.white};
    box-sizing: border-box;
    background-color: ${colors.green};
    color: ${colors.white};
    font-size: 1rem;
    position: absolute;
    top: 14px;
    left: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100px;
  }
  .meet-heart {
    position: absolute;
    top: 12px;
    right: 12px;
  }

  .meet_info {
    display: flex;
    flex-direction: column;
    gap: 3px;
    padding: 0px 8px 12px;
    &-root {
      display: flex;
      align-items: center;
      gap: 3px;
      color: ${colors.grey2};
      font-size: 1rem;
    }

    &-title {
      color: ${colors.black};
      font-weight: bold;
      font-size: 1.4rem;
    }

    &-date {
      display: flex;
      gap: 2px;
      font-size: 1rem;
      color: ${colors.grey2};
      margin-bottom: 16px;
      span {
      }
    }

    &_items {
      display: flex;
      gap: 8px;
      color: ${colors.grey2};
      font-size: 0.8rem;
      &-item {
        display: flex;
        align-items: center;
        gap: 2.75px;
      }
    }
  }
`;
