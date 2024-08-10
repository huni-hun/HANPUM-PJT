import { colors } from '@/styles/colorPalette';
import styled from 'styled-components';

export const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 24px;

  .pagenation {
    display: flex;
    gap: 3px;

    .page {
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 50%;
      background-color: ${colors.grey2};
    }
    .page-active {
      width: 1.3rem;
      height: 0.5rem;
      border-radius: 100px;
      background-color: ${colors.red};
    }
  }
`;
