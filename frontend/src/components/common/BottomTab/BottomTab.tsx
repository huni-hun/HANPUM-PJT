import * as Bt from './BottomTab.styled';
import Icon from '../Icon/Icon';
import { useState } from 'react';

function BottomTab() {
  const [curTab, setCurTab] = useState<string>('');

  return (
    <Bt.BottomTab>
      <Bt.BottomTabItem
        onClick={() => {
          setCurTab('Home');
        }}
      >
        <Icon
          name={curTab === 'Home' ? 'IconHomeSelect' : 'IconHome'}
          size={20}
        />
      </Bt.BottomTabItem>
      <Bt.BottomTabItem
        onClick={() => {
          setCurTab('Class');
        }}
      >
        <Icon
          name={curTab === 'Class' ? 'IconClassSelect' : 'IconClass'}
          size={20}
        />
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
      </Bt.BottomTabItem>
      <Bt.BottomTabItem
        onClick={() => {
          setCurTab('Schedule');
        }}
      >
        <Icon
          name={curTab === 'Schedule' ? 'IconScheduleSelect' : 'IconSchedule'}
          size={20}
        />
      </Bt.BottomTabItem>
    </Bt.BottomTab>
  );
}

export default BottomTab;
