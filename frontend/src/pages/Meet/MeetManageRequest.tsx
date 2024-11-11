/** 모임 - 모임신청 */

import { useEffect, useState } from 'react';
import * as M from '@/components/Style/Meet/MeetRequest';
import Header from '@/components/common/Header/Header';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import memberImg from '../../assets/img/memberImg.svg';
import BaseButton from '@/components/common/BaseButton';
import { PostMeetApply } from '@/api/meet/POST';
import { toast } from 'react-toastify';
import { GetUser } from '@/api/mypage/GET';
import { MemberDetailDataProps } from '@/models/meet';

function MeetManageRequest() {
  const navigate = useNavigate();

  const [applyPost, setApplyPost] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [memberData, setMemberData] = useState<MemberDetailDataProps | null>(
    null,
  );
  /** 멤버 아이디 넘겨받기 */
  const savedGroupId = localStorage.getItem('groupId');
  const groupId = savedGroupId ? Number(JSON.parse(savedGroupId)) : null;

  /** 회원 정보 가져오기 */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetUser();
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

  /** post - 모임 신청 */
  const handleApply = async () => {
    if (groupId) {
      try {
        setLoading(true);
        const response = await PostMeetApply(groupId, applyPost);
        if (response && response.status === 'SUCCESS') {
          toast.success('신청이 완료되었습니다.');
          navigate('/meet/detail', {
            state: { groupId },
          });
        } else if (response.status === 'ERROR') {
          toast.error(response.message);
          navigate('/meet/detail', {
            state: { groupId },
          });
        }
      } catch (error) {
        toast.error('에러 발생');
      } finally {
        setLoading(false);
      }
    }
  };

  /** Input change handler */
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setApplyPost(event.target.value);
  };

  const getGenderText = (gender: 'MAN' | 'WOMAN' | undefined): string => {
    if (gender === 'MAN') {
      return '남자';
    } else if (gender === 'WOMAN') {
      return '여자';
    } else {
      return '정보 없음';
    }
  };

  /** dummy member data */
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
            <img src={dummyMemberData[0]?.img} alt="프로필 이미지" />
          </M.Img>
          <M.Name>{dummyMemberData[0]?.nickname}</M.Name>
        </M.ProfileBox>
        <M.ProfileInfo>
          {profileDetails.map((detail, index) => (
            <M.ProfileInfoDetail key={index}>
              <M.ProfileInfoTitle>{detail?.title}</M.ProfileInfoTitle>
              <M.ProfileInfoContent>{detail?.content}</M.ProfileInfoContent>
            </M.ProfileInfoDetail>
          ))}
        </M.ProfileInfo>
        <M.InfoInputBox>
          <M.InfoText>지원글을 작성해주세요</M.InfoText>
          <M.InfoInput
            value={applyPost}
            onChange={handleInputChange}
            placeholder="지원글을 입력하세요"
          />
          <M.InfoButtonWrap>
            <BaseButton
              size="large"
              // style={{ margin: '15rem 3.5rem' }}
              onClick={handleApply}
              disabled={loading}
            >
              {loading ? '처리 중...' : '신청하기'}
            </BaseButton>
          </M.InfoButtonWrap>
        </M.InfoInputBox>
      </M.InfoWrap>
    </MainPageContainer>
  );
}

export default MeetManageRequest;

const MainPageContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
`;
