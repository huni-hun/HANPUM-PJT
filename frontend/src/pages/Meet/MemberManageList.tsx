/** 모임 - 인원관리 */

import { useEffect, useState } from 'react';

import * as M from '@/components/Style/Meet/MeetFilter.styled';

import Header from '@/components/common/Header/Header';

import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';

import { RouteDetailProps } from '@/models/route';
import FilterTable from '@/components/Meet/FilterTable';
import MemberList from '@/components/Meet/MemberList';
import memberImg from '../../assets/img/memberImg.svg';
import { MemberInfo } from '@/models/meet';
import { GetMeetMemberList } from '@/api/meet/GET';
import { toast } from 'react-toastify';

function MemberManageList() {
  const navigate = useNavigate();
  const [listData, setListData] = useState<MemberInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  /** 아이디  넘겨받기 */
  const location = useLocation();
  const { groupId } = location.state || {};

  /** 신청관리 리스트 */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetMeetMemberList(groupId);
        if (response && response.status === 'SUCCESS') {
          setListData(response.data.groupMemberResList || []);
        } else if (response.status === 'ERROR') {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error('에러');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const clickMember = (memberId: number) => {
    navigate('/meet/memberDetail', { state: { groupId, memberId } });
  };

  return (
    <MainPageContainer>
      <Header
        purpose="result"
        title="모임 인원 관리"
        clickBack={() => navigate(-1)}
      />
      {listData.length > 0 ? (
        <MemberList memberInfo={listData} onClick={clickMember} />
      ) : (
        <>인원이 없습니다.</>
      )}
    </MainPageContainer>
  );
}

export default MemberManageList;

const MainPageContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
`;
