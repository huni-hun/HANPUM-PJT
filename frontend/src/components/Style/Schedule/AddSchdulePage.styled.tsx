import styled from 'styled-components';

export const Container = styled.div`
  width: 85vw;
  height: 100%;
  box-sizing: border-box;
  margin: auto;
`;

export const SchduleContainer = styled.div`
  width: 100%;
  height: 60vh;
  margin-top: 2rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const DateWrap = styled.div<{ $isExpanded?: boolean }>`
  height: ${({ $isExpanded }) => ($isExpanded ? '120vw' : '24vw')};
  width: 96%;
  background-color: #fff;
  border-radius: 2rem;
  display: ${({ $isExpanded }) =>
    $isExpanded ? 'block' : 'flex'}; /* 'normal'은 'block'으로 변경 */
  align-items: ${({ $isExpanded }) =>
    $isExpanded ? 'normal' : 'center'}; /* 'normal'은 'flex-start'로 변경 */
  justify-content: space-between;
  padding: ${({ $isExpanded }) => ($isExpanded ? '4rem 3rem' : '2rem 3rem')};
  box-shadow: 0rem 1rem 1rem #e1e1e1;
  margin: 0rem 0 3rem 0;
  transition: height 0.5s ease;
  box-sizing: border-box;
`;

export const H3 = styled.p`
  font-size: 2rem;
  font-weight: bold;
`;

export const DatePicker = styled.div`
  margin-top: 2rem;
  text-align: center;
  width: 100%;
  height: 100%;
  font-size: 4rem;
  align-items: center;
  justify-content: space-between;
`;

export const RouteWrap = styled.div<{ $isExpanded: boolean }>`
  height: ${({ $isExpanded }) => ($isExpanded ? '24vw' : '100vw')};
  width: 96%;
  background-color: #fff;
  border-radius: 2rem;
  padding: 1.2rem 2.4rem;
  box-shadow: 0rem 1rem 1rem #e1e1e1;
  transition: height 0.5s ease;
  box-sizing: border-box;
`;

export const RouteTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  /* padding: 1.2rem; */
`;

export const RoutePointWrap = styled.div`
  width: 28vw;
  height: 6vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
`;

export const RoutePointSection = styled.div`
  height: 100%;
  width: 30vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: inherit;
  text-align: center;
`;

export const RoutePointTitle = styled.div`
  color: #a0a0a0;
  font-weight: bold;
  font-size: 1.3rem;
`;

export const RoutePointContent = styled.div`
  font-weight: bold;
  font-size: 1.3rem;
  color: #515151;
`;

export const RouteMapWrap = styled.div<{ $isExpanded: boolean }>`
  margin-top: 1rem;
  padding-top: 2rem;
  border-top: 1px solid #ccc;
  height: ${({ $isExpanded }) => ($isExpanded ? '3vw' : '65vw')};
`;

export const RouteMapContent = styled.div`
  background-color: #ccc;
  transition: height 0.5s ease;
  border-radius: 1.5rem;
  text-align: center;
  font-size: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
`;

export const ScheduleType = styled.p<{ selected: boolean }>`
  font-size: 1.5rem;
  color: ${(props) => (props.selected ? '#000000' : '#d9d9d9')};
  font-weight: bold;
`;

export const ScheduleMainContainer = styled.div`
  width: 100%;
  height: 84vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8rem 0 0 0;
  box-sizing: border-box;
`;

export const NextBtn = styled.div`
  width: 95%;
  display: flex;
  justify-content: right;
`;

/** 일정 수정 달력 wrap */
export const DatePickerEditWrap = styled.div`
  height: 120vw;
  width: 97%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 9rem;
`;
