import * as Bt from './BottomTab.styled';
import Icon from '../Icon/Icon';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function BottomTab() {
  const [curTab, setCurTab] = useState<string>('Home');
  const location = useLocation();
  const navigator = useNavigate();

  useEffect(() => {
    setCurTab(location.pathname);
  }, [location]);
  return (
    <Bt.BottomTab>
      <Bt.BottomTabItem
        onClick={() => {
          navigator('/route/list');
        }}
      >
        <Icon
          name={curTab.includes('route') ? 'IconRouteGreen' : 'IconRouteGrey'}
          size={20}
        />
        <Bt.TabText isSelected={curTab.includes('route')}>경로</Bt.TabText>
      </Bt.BottomTabItem>
      <Bt.BottomTabItem
        onClick={() => {
          navigator('/meet');
        }}
      >
        <Icon
          name={curTab.includes('meet') ? 'IconClassSelect' : 'IconClass'}
          size={20}
        />
        <Bt.TabText isSelected={curTab.includes('meet')}>모임</Bt.TabText>
      </Bt.BottomTabItem>
      <Bt.BottomTabItem
        onClick={() => {
          navigator('/main');
        }}
      >
        <Icon
          name={curTab.includes('main') ? 'IconHomeSelect' : 'IconHome'}
          size={20}
        />
        <Bt.TabText isSelected={curTab.includes('main')}>홈</Bt.TabText>
      </Bt.BottomTabItem>
      <Bt.BottomTabItem
        onClick={() => {
          setCurTab('Community');
        }}
      >
        <Icon
          name={
            curTab === 'Community' ? 'IconCommunitySelect' : 'IconCommunity'
          }
          size={20}
        />
        <Bt.TabText isSelected={curTab.includes('meet')}>게시판</Bt.TabText>
      </Bt.BottomTabItem>
      <Bt.BottomTabItem
        onClick={() => {
          navigator('/schedule/main');
        }}
      >
        <Icon
          name={curTab === 'Schedule' ? 'IconScheduleSelect' : 'IconSchedule'}
          size={20}
        />
        <Bt.TabText isSelected={curTab.includes('schedule')}>일정</Bt.TabText>
      </Bt.BottomTabItem>
    </Bt.BottomTab>
  );
}

export default BottomTab;
