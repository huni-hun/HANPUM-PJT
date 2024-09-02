import { colors } from '@/styles/colorPalette';
import styled from 'styled-components';

export const ConfigItemContainer = styled.div`
  /* margin:; */
  margin-bottom: 2rem;
  height: 2.2rem;
`;

export const PolicyContainer = styled.div`
  height: 100%;
  background-color: ${colors.white};
`;

export const AnnouncementContainer = styled.div`
  height: 100%;
  background-color: ${colors.white};
`;

export const WithdrawContainer = styled.div`
  height: 100%;
  background-color: ${colors.white};
  padding: 16px;

  .text-box {
    padding: 0 8px;
  }

  .section {
    padding: 16px 13px;
    background-color: ${colors.grey5};
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .agree-box {
    /* width: 30rem; */
    padding: 0 30px;
    height: 2.4rem;
    margin: 10rem auto 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    .agree {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      border: 1px solid ${colors.grey2};
      box-sizing: border-box;
    }
    .check {
      background-color: ${colors.main};
      border: none;
    }
  }
`;

export const ChangePwContainer = styled.div`
  height: 100%;
  background-color: ${colors.white};
  padding: 20px 24px;
`;
