/** 모임 신청 수락하기 */

import { useEffect, useState } from 'react';
import * as M from '@/components/Style/Meet/MeetRequest';
import Header from '@/components/common/Header/Header';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import memberImg from '../../assets/img/memberImg.svg';
import BaseButton from '@/components/common/BaseButton';
import MeetModal from '@/components/Meet/MeetModal';
import { colors } from '@/styles/colorPalette';
import { GetMeetMemberDetailList } from '@/api/meet/GET';
import { MemberDetailDataProps } from '@/models/meet';
import { toast } from 'react-toastify';
import { DeleteMeetDecline } from '@/api/meet/Delete';
import { PutAceeptGroup } from '@/api/meet/PUT';

function MeetManageAcceptPage() {
  const navigate = useNavigate();
  const [isRejectModalOpen, setIsRejectModalOpen] = useState<boolean>(false);
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState<boolean>(false);
  const [memberData, setMemberData] = useState<MemberDetailDataProps | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(false);
  /** 멤버 아이디 넘겨받기 */
  const location = useLocation();
  const savedGroupId = localStorage.getItem('groupId');
  const groupIdNumber = savedGroupId ? Number(JSON.parse(savedGroupId)) : null;
  const { groupId, memberId } = location.state || {};

  useEffect(() => {
    const fetchData = async () => {
      if (groupIdNumber) {
        try {
          const response = await GetMeetMemberDetailList(
            groupIdNumber,
            memberId,
          );
          if (response && response.status === 'SUCCESS') {
            setMemberData(response.data || null);
          } else if (response.status === 'ERROR') {
            console.error(response.message);
          }
        } catch (error) {
          toast.error('에러');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, []);

  const getGenderText = (gender: 'MAN' | 'WOMAN' | undefined): string => {
    if (gender === 'MAN') {
      return '남자';
    } else if (gender === 'WOMAN') {
      return '여자';
    } else {
      return '정보 없음';
    }
  };

  const dummyMemberData = memberData
    ? [
        {
          img: memberData.profilePicture || memberImg,
          nickname: memberData.nickname || '닉네임 없음',
          name: memberData.name || '이름 없음',
          gender: getGenderText(memberData.gender),
          birth: memberData.birthDate || '생년월일 없음',
          applyContent: memberData.applyPost || '지원글 없음',
        },
      ]
    : [];

  const profileDetails =
    dummyMemberData.length > 0
      ? [
          { title: '이름', content: dummyMemberData[0].name },
          { title: '성별', content: dummyMemberData[0].gender },
          { title: '생년월일', content: dummyMemberData[0].birth },
        ]
      : [];

  const rejectModalOpen = () => {
    setIsRejectModalOpen(true);
    setIsAcceptModalOpen(false);
  };

  const rejectModalClose = () => {
    setIsRejectModalOpen(false);
  };

  const acceptModalOpen = () => {
    setIsAcceptModalOpen(true);
    setIsRejectModalOpen(false);
  };

  const acceptModalClose = () => {
    setIsAcceptModalOpen(false);
  };

  /** 모임 신청 거절 */
  const declineGroup = async () => {
    try {
      setLoading(true);
      const response = await DeleteMeetDecline(10);
      if (response && response.status === 'SUCCESS') {
        toast.success('거절 완료되었습니다.');
        setIsRejectModalOpen(false);
      } else if (response.status === 'ERROR') {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error('에러 발생');
    } finally {
      setIsRejectModalOpen(false);
      setLoading(false);
    }
  };

  /** 모임 신청 수락 */
  const acceptGroup = async () => {
    try {
      setLoading(true);
      const response = await PutAceeptGroup(10);
      if (response && response.status === 'SUCCESS') {
        toast.success('수락 완료되었습니다.');
        setIsAcceptModalOpen(false);
      } else if (response.status === 'ERROR') {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error('에러 발생');
    } finally {
      setIsAcceptModalOpen(false);
      setLoading(false);
    }
  };

  return (
    <MainPageContainer>
      <Header
        purpose="result"
        title="모임 신청"
        clickBack={() => navigate(-1)}
      />
      <M.InfoWrap>
        {dummyMemberData.length > 0 && (
          <>
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
              <M.InfoInput disabled>
                {dummyMemberData[0].applyContent}
              </M.InfoInput>
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
                  onClick={acceptModalOpen}
                >
                  수락
                </BaseButton>
              </M.ButtonWrap>
            </M.InfoInputBox>
          </>
        )}
      </M.InfoWrap>
      {isRejectModalOpen && (
        <MeetModal
          onCancel={rejectModalClose}
          onConfirm={declineGroup}
          title="정말 모임 신청을 거절하시겠어요?"
          content={'한 번 거절하시면 다시 지원자의 정보를 볼 수 없습니다.'}
        />
      )}

      {isAcceptModalOpen && (
        <MeetModal
          onCancel={acceptModalClose}
          onConfirm={acceptGroup}
          title="정말 모임 신청을 수락하시겠어요?"
          content={'수락 후 신청자가 승인됩니다.'}
        />
      )}
    </MainPageContainer>
  );
}

export default MeetManageAcceptPage;

const MainPageContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
`;
