import { colors } from '@/styles/colorPalette';
import styled from 'styled-components';

export const CommunityContainer = styled.div`
  margin-top: 26px;
  .community_container {
    display: flex;
    flex-direction: column;
    gap: 13px;
    margin-top: 13px;
    .community-item {
      display: flex;
      gap: 14px;
      .icon {
        width: 2.2rem;
        height: 2.2rem;
        background-color: ${colors.grey1};
      }
    }
  }
`;
