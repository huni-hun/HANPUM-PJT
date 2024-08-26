/** 모임 - 신청 수락하기 */

import { useState } from 'react';
import * as M from '@/components/Style/Meet/MeetRequest';
import Header from '@/components/common/Header/Header';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { RouteDetailProps } from '@/models/route';
import memberImg from '../../assets/img/memberImg.svg';
import BaseButton from '@/components/common/BaseButton';
import MeetModal from '@/components/Meet/MeetModal';
import { colors } from '@/styles/colorPalette';

function MeetAcceptPage() {
  const navigate = useNavigate();
  const [routeData, setRouteData] = useState<RouteDetailProps | null>(null);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState<boolean>(false);

  /** member data */
  const dummyMemberData = [
    {
      img: memberImg,
      nickname: '닉네임',
      name: '김동길',
      gender: '남',
      birth: '2000-11-09',
      applyContent: '작성글입니다.',
    },
  ];

  const profileDetails = [
    { title: '이름', content: dummyMemberData[0].name },
    { title: '성별', content: dummyMemberData[0].gender },
    { title: '생년월일', content: dummyMemberData[0].birth },
  ];

  const rejectModalOpen = () => {
    setIsRejectModalOpen(true);
  };

  const rejectModalClose = () => {
    setIsRejectModalOpen(false);
  };

  return (
    <MainPageContainer>
      <Header
        purpose="result"
        title="모임 신청"
        clickBack={() => navigate(-1)}
      />
      <M.InfoWrap>
        <M.ProfileBox>
          <M.Img>
            <img src={dummyMemberData[0].img} alt="프로필 이미지" />
          </M.Img>
          <M.Name>{dummyMemberData[0].nickname}</M.Name>
        </M.ProfileBox>
        <M.ProfileInfo>
          {profileDetails.map((detail, index) => (
            <M.ProfileInfoDetail key={index}>
              <M.ProfileInfoTitle>{detail.title}</M.ProfileInfoTitle>
              <M.ProfileInfoContent>{detail.content}</M.ProfileInfoContent>
            </M.ProfileInfoDetail>
          ))}
        </M.ProfileInfo>
        <M.InfoInputBox>
          <M.InfoText>지원글</M.InfoText>
          <M.InfoInput disabled>{dummyMemberData[0].applyContent}</M.InfoInput>
          <M.ButtonWrap>
            <BaseButton
              size="large"
              style={{ backgroundColor: `${colors.grey1}` }}
              onClick={rejectModalOpen}
            >
              거절
            </BaseButton>

            <BaseButton
              size="large"
              style={{ margin: '' }}
              onClick={rejectModalOpen}
            >
              수락
            </BaseButton>
          </M.ButtonWrap>
        </M.InfoInputBox>
      </M.InfoWrap>
      {isRejectModalOpen && (
        <MeetModal
          onClick={rejectModalClose}
          title="정말 모임 신청을 거절하시겠어요?"
          content={'한 번 거절하시면  다시 지원자의 정보를 볼 수 없습니다.'}
        />
      )}
    </MainPageContainer>
  );
}

export default MeetAcceptPage;

const MainPageContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
`;
