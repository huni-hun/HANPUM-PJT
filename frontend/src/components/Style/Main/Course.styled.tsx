import { colors } from '@/styles/colorPalette';
import styled from 'styled-components';

export const Container = styled.div`
  background-color: pink;
  margin-top: 16px;
  display: flex;
  border-radius: 17px;
  overflow: hidden;
  position: relative;
  margin-bottom: 20px;

  img {
    width: 100%;
    height: 100%;
  }

  .course-text {
    position: absolute;
    top: 16px;
    left: 16px;
    /* color: ${colors.white}; */
    color: ${colors.black};
    &_title {
      margin-bottom: 3px;
      font-weight: bold;
      font-size: 1.6rem;
    }
    &_desc {
      font-size: 1.2rem;
    }
  }

  .course {
    position: absolute;
    bottom: 12px;
    left: 19px;
    display: flex;
    gap: 6px;
    /* color: ${colors.white}; */
    color: ${colors.black};
    &-item {
      font-size: 1.2rem;
    }
  }

  .course_info {
    position: absolute;
    right: 16px;
    bottom: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &-day {
      margin-bottom: 1px;
      color: rgba(0, 0, 0, 0.6);
      font-size: 1rem;
    }
    &-km {
      font-size: 1.2rem;
      /* color: ${colors.white}; */
      color: ${colors.black};
    }
  }
`;
