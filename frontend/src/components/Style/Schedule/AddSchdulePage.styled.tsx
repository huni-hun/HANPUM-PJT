import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  box-sizing: border-box;
`;

export const SchduleContainer = styled.div`
  width: 100vw;
  height: 6vh;
  margin-top: 5rem;
`;
export const DateWrap = styled.div<{ isExpanded: boolean }>`
  height: ${({ isExpanded }) => (isExpanded ? '75vh' : '11vh')};
  width: 90vw;
  background-color: #fff;
  border-radius: 2rem;
  display: ${({ isExpanded }) => (isExpanded ? 'normal' : 'flex')};
  align-items: ${({ isExpanded }) => (isExpanded ? 'normal' : 'center')};
  justify-content: space-between;
  padding: ${({ isExpanded }) => (isExpanded ? '4rem 3rem' : '2rem 3rem')};
  box-shadow: 0rem 1rem 1rem #e1e1e1;
  margin: 10rem 0 3rem 0;
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
  background-color: #ccc;
  height: 95%;
  font-size: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const RouteWrap = styled.div<{ isExpanded: boolean }>`
  height: ${({ isExpanded }) => (isExpanded ? '11vh' : '75vh')};
  width: 90vw;
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
  width: 40vw;
  height: 8vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  margin-bottom: 1rem;
  box-sizing: border-box;
  :nth-child(1) ::after {
    content: '';
    border-left: 1px solid #ccc;
    width: 1vw;
    height: 85%;
    position: absolute;
    right: 18vw;
    top: 0;
  }
`;

export const RoutePointSection = styled.div`
  width: 20vw;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: inherit;
  text-align: center;
`;
export const RoutePointTitle = styled.div`
  color: #a0a0a0;
  font-weight: bold;
  font-size: 1.5rem;
`;

export const RoutePointContent = styled.div`
  font-weight: bold;
  font-size: 2rem;
`;

export const RouteMapWrap = styled.div`
  padding-top: 2rem;
  border-top: 1px solid #ccc;
`;

export const RouteMapContent = styled.div`
  background-color: #ccc;
  height: 60vh;
  border-radius: 1.5rem;
  text-align: center;
  font-size: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ScheduleType = styled.p<{ isSelected: boolean }>`
  font-size: 1.5rem;
  color: ${(props) => (props.isSelected ? '#000000' : '#d9d9d9')};
  font-weight: bold;
`;

export const ScheduleMainContainer = styled.div`
  width: 100vw;
  height: 84vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8rem 0 0 0;
  box-sizing: border-box;
`;
