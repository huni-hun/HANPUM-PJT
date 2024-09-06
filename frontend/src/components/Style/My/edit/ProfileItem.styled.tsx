import { colors } from '@/styles/colorPalette';
import styled from 'styled-components';

export const ProfileItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .info {
    width: 25rem;
    height: 5.4rem;
    border-bottom: 1px solid ${colors.grey4};
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding-left: 1.2rem;
    box-sizing: border-box;
    font-size: 1.6rem;
    .kakao {
      width: 100%;
      display: flex;
      align-items: center;
      img {
        margin-right: 6px;
      }
    }
  }
`;
