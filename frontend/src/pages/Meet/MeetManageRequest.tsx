/** 모임 - 모임신청 */

import { useState } from 'react';
import * as M from '@/components/Style/Meet/MeetRequest';
import Header from '@/components/common/Header/Header';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import memberImg from '../../assets/img/memberImg.svg';
import BaseButton from '@/components/common/BaseButton';
import { PostMeetApply } from '@/api/meet/POST';
import { toast } from 'react-toastify';

function MeetManageRequest() {
  const navigate = useNavigate();

  const [applyPost, setApplyPost] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  /** post - 모임 신청 */
  const handleApply = async () => {
    try {
      setLoading(true);
      const response = await PostMeetApply(10, applyPost);
      if (response && response.status === 'SUCCESS') {
        toast.success('신청이 완료되었습니다.');
      } else {
        toast.error('신청에 실패했습니다.');
      }
    } catch (error) {
      toast.error('에러 발생');
    } finally {
      setLoading(false);
    }
  };

  /** Input change handler */
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setApplyPost(event.target.value);
  };

  /** dummy member data */
  const dummyMemberData = [
    {
      img: memberImg,
      nickname: '닉네임',
      name: '김동길',
      gender: '남',
      birth: '2000-11-09',
    },
  ];

  const profileDetails = [
    { title: '이름', content: dummyMemberData[0].name },
    { title: '성별', content: dummyMemberData[0].gender },
    { title: '생년월일', content: dummyMemberData[0].birth },
  ];

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
          <M.InfoText>지원글을 작성해주세요</M.InfoText>
          <M.InfoInput
            value={applyPost}
            onChange={handleInputChange}
            placeholder="지원글을 입력하세요"
          />
          <BaseButton
            size="large"
            style={{ margin: '15rem 3rem' }}
            onClick={handleApply}
            disabled={loading}
          >
            {loading ? '처리 중...' : '신청하기'}
          </BaseButton>
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
