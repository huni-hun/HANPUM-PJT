import styled from 'styled-components';
import { colors } from '@styles/colorPalette';

export const HeaderWrapper = styled.div`
  height: 6.8rem;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 0 2rem;
  background-color: ${colors.white};
  position: sticky;
  top: 0;
  z-index: 10;

  .back-arrow {
    position: absolute;
    top: 50%;
    left: 16px;
    transform: translateY(-50%);
  }

  .place-input {
    width: 100%;
    height: 3.4rem;
    border: 1px solid ${colors.grey3};
    border-radius: 100px;
    outline: none;
    padding: 0 20px;
    font-size: 1.4rem;
    box-sizing: border-box;
    ::placeholder {
      color: ${colors.grey2};
    }

    &:focus {
      outline: none;
    }
  }

  .search-bar {
    display: flex;
    align-items: center;
    border: 1px solid ${colors.grey2};
    height: 3.4rem;
    padding: 0 12px;
    border-radius: 100px;
    font-size: 1.4rem;
    width: 100%;
    input {
      border: none;
      padding: 0;
      padding-left: 5px;
      &:focus {
        outline: none;
      }
    }
  }
`;
