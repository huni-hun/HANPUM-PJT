import React from 'react';
import { MemberListProps } from '@/models/meet';
import * as M from '../Style/Meet/MemberList.styled';

const MemberList = ({ memberInfo = [], onClick }: MemberListProps) => {
  return (
    <M.ListContainer>
      {memberInfo.map((member, index) => (
        <M.ListItem
          key={index}
          onClick={() => onClick && onClick(member.groupMemberId ?? 0)}
        >
          <M.MemberImg>
            <img src={member.profilePicture} alt={`${member.nickname}`} />
          </M.MemberImg>
          <M.MemberName>{member.nickname}</M.MemberName>
        </M.ListItem>
      )) || <></>}
    </M.ListContainer>
  );
};

export default MemberList;
