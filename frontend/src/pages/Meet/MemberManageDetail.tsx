import { useEffect, useState } from 'react';
import * as M from '@/components/Style/Meet/MeetRequest';
import Header from '@/components/common/Header/Header';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { GetMeetMemberDetailList } from '@/api/meet/GET';
import { MemberDetailDataProps } from '@/models/meet';
import { toast } from 'react-toastify';

function MemberManageDetail() {
  const navigate = useNavigate();
  const [memberData, setMemberData] = useState<MemberDetailDataProps | null>(
    null,
  );
  const [isRejectModalOpen, setIsRejectModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetMeetMemberDetailList(10, 10);
        if (response && response.status === 'SUCCESS') {
          setMemberData(response.data || null);
        } else {
          console.error('error');
        }
      } catch (error) {
        toast.error('에러');
      } finally {
        setLoading(false);
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
          img: memberData.profilePicture || '',
          nickname: memberData.nickname || '',
          name: memberData.name || '',
          gender: getGenderText(memberData.gender),
          birth: memberData.birthDate || '',
          applyContent: memberData.applyPost || '-',
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
            <img
              src={dummyMemberData.length > 0 ? dummyMemberData[0].img : ''}
              alt="프로필 이미지"
            />
          </M.Img>
          <M.Name>
            {dummyMemberData.length > 0
              ? dummyMemberData[0].nickname
              : '정보 없음'}
          </M.Name>
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
            {dummyMemberData.length > 0 ? dummyMemberData[0].applyContent : '-'}
          </M.InfoInput>
        </M.InfoInputBox>
      </M.InfoWrap>
    </MainPageContainer>
  );
}

export default MemberManageDetail;

const MainPageContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
`;
