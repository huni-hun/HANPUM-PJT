import styled from 'styled-components';

export const ActivityContainer = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 29px;

  .activity_container {
    padding: 16px 20px 16px 26px;
    box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0.15);
    display: flex;
    justify-content: space-between;
    border-radius: 12px;
    .activity_item {
      width: 100%;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      gap: 4px;
    }
  }
`;
