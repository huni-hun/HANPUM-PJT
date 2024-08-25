/** feed 정보 컴포넌트 */
import React from 'react';
import * as S from '@/components/Style/Schedule/SchduleMainPage.styled';
import { MeetMemberProps } from '@/models/schdule';

const MeetMember = ({
  memberCount,
  memberImgs,
  memberNames,
}: MeetMemberProps) => {
  return (
    <>
      <S.SchduleProgressWrap>
        <S.MemberTitle>
          모임 멤버 <span className="sub_title">인원 {memberCount}</span>
        </S.MemberTitle>
        <S.MembersWrap>
          {memberImgs.map((img, index) => (
            <S.Members key={index}>
              <img src={img} alt={`Member ${index + 1}`} />
              <p>{memberNames[index]}</p>
            </S.Members>
          ))}
        </S.MembersWrap>
      </S.SchduleProgressWrap>
    </>
  );
};

export default MeetMember;
