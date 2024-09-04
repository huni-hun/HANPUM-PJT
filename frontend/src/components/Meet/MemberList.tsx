import React from 'react';
import { MeetMemberListProps } from '@/models/meet';
import * as M from '../Style/Meet/MemberList.styled';

const MemberList = ({ memberInfo, onClick }: MeetMemberListProps) => {
  return (
    <M.ListContainer>
      {memberInfo.map((member, index) => (
        <M.ListItem key={index} onClick={() => onClick && onClick(member.name)}>
          <M.MemberImg>
            <img src={member.img} alt={`${member.name}`} />
          </M.MemberImg>
          <M.MemberName>{member.name}</M.MemberName>
        </M.ListItem>
      ))}
    </M.ListContainer>
  );
};

export default MemberList;
