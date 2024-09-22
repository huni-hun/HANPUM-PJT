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
import MeetNoHave from '@/components/Meet/MeetNoHave';

function MemberManageList() {
  const navigate = useNavigate();
  const [listData, setListData] = useState<MemberInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  /** 아이디  넘겨받기 */
  const savedGroupId = localStorage.getItem('groupId');
  const groupId = savedGroupId ? Number(JSON.parse(savedGroupId)) : null;

  /** 신청관리 리스트 */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetMeetMemberList(groupId || 0);
        if (response && response.status === 'SUCCESS') {
          // joinType이 "GROUP_LEADER"가 아닌 데이터만 필터링하여 listData에 저장
          const filteredData = response.data.groupMemberResList.filter(
            (member: MemberInfo) => member.joinType !== 'GROUP_LEADER',
          );
          setListData(filteredData || []);
        } else if (response.status === 'ERROR') {
          toast.error(response.message);
          navigate('/meet/detail');
        }
      } catch (error) {
        toast.error('에러');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const clickMember = (groupMemberId: number) => {
    navigate('/meet/memberDetail', { state: { groupId, groupMemberId } });
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
        <MeetNoHave category="memberList" />
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
