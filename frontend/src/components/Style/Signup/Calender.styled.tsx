import styled from 'styled-components';

export const CalenderContainer = styled.div`
  width: 100%;
  height: 22.8rem;
  padding: 20px 16px 0;
  box-sizing: border-box;

  .calender {
    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 29px;
      span {
        flex: 1;
        text-align: center;
      }
    }
    &-body {
      display: flex;

      /* &-list {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 16.7rem;
        overflow-y: scroll;
        scroll-behavior: smooth;

        ::-webkit-scrollbar {
          width: 0;
          height: 0;
        } */

      /* .calender-body-item {
          width: 100%;
          text-align: center;

          &:nth-child(3) {
            background-color: #e6f7e6;
            border-radius: 5px;
          }
        } */
      /* } */
    }
  }
`;

export const Selector = styled.div`
  width: 33.33%;
  height: 6rem; /* 선택된 항목 포함 3개 또는 4개 항목이 보이도록 설정 */
  overflow: hidden;
  position: relative;
`;

export const ScrollList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  overflow-y: scroll;
  scroll-behavior: smooth;
  padding-top: 2rem;

  /* 스크롤 바 숨기기 (웹킷 기반 브라우저용) */
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;

export const ScrollItem = styled.div<{ selected?: boolean }>`
  height: 2rem;
  line-height: 2rem;
  font-size: 1.5rem;
  user-select: none;
  text-align: center;
  color: ${(props) => (props.selected ? '#000' : '#b0b0b0')};
  background-color: ${(props) => (props.selected ? '#e0f7e0' : 'transparent')};
`;

export const Overlay = styled.div`
  position: absolute;
  top: calc(50% - 1rem);
  width: 100%;
  height: 2rem;
  /* border-radius: 5px; */
  background-color: rgba(76, 175, 80, 0.2);
  pointer-events: none;
`;

export const DateSelectorFooter = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
`;
