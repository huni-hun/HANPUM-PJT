import { colors } from '@/styles/colorPalette';
import styled from 'styled-components';

export const FormContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${colors.white};

  .form_container {
    width: 100%;
    padding: 0 24px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    .checkbox_input {
      display: flex;
      align-items: center;
      margin-top: 10px;
      margin-bottom: 32px;
      gap: 6px;
      &-box {
        width: 2rem;
        height: 2rem;
        border-radius: 3px;
        border: 1px solid ${colors.grey2};
        box-sizing: border-box;
      }
    }
  }

  .login_group {
    display: flex;
    margin-top: 12px;
    margin: 12px auto 0;
    width: 33.5rem;
    span {
      flex: 1;
      text-align: center;
      padding: 0 5px;
    }

    span:nth-child(2) {
      border-left: 1px solid #000;
      border-right: 1px solid #000;
    }
  }
`;
