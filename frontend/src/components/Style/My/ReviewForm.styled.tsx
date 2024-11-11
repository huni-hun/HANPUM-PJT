import { colors } from '@/styles/colorPalette';
import styled from 'styled-components';

export const ReviewFormContainer = styled.div`
  width: 100%;
  background-color: ${colors.white};
  padding: 16px 24px 0px;
  box-sizing: border-box;

  position: relative;

  .course_img {
    width: 10.9rem;
    height: 8.2rem;
    border-radius: 12px;
  }

  .stars-box {
    width: 100%;
    height: 4rem;
    display: flex;
    justify-content: center;
    align-items: start;
    margin: 12px 0 16px;
  }

  textarea {
    width: 100%;
    height: 25.7rem;
    border-radius: 12px;
    border: 1px solid ${colors.grey3};
    margin-top: 4px;
    padding: 17px 16px;
    box-sizing: border-box;
    outline: none;
    font-size: 1.2rem;
  }

  .card-bottom {
    margin-top: 15rem;
    display: flex;
    justify-content: center;
  }
`;
