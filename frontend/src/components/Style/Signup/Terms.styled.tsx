import { colors } from '@/styles/colorPalette';
import styled from 'styled-components';

export const TermsContainer = styled.div`
  display: flex;
  flex-direction: column;

  .pagenation {
    display: flex;
    gap: 3px;
    padding-left: 24px;

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

  .title {
    font-size: 2rem;
    font-weight: bold;
    color: ${colors.green};
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
`;
