import styled from 'styled-components';
import img from '../../assets/img/img1.jpg';
import DateBadge from '../common/Badge/DateBadge';
import InfoBadge from '../common/Badge/InfoBadge';
import RouteBadge from '../common/Badge/RouteBadge';
import Icon from '../common/Icon/Icon';
import Text from '../common/Text';
import { MeetInfo } from '@/models/meet';
import { startDateEndDateStringFormat } from '@/utils/util';
import { useNavigate } from 'react-router-dom';
import { PostMeetLike } from '@/api/meet/POST';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';
import { isAuthEnticatedAtom } from '@/atoms/isAuthEnticatedAtom';
import { useState } from 'react';
import { DeleteMeetLike } from '@/api/meet/Delete';
import { setDefaultImg } from '@/utils/Image';

function MeetSmallCard({
  data,
  onClick,
  refetchGroupList,
}: {
  data: MeetInfo;
  onClick?: () => void;
  refetchGroupList: () => void;
}) {
  const navigate = useNavigate();
  const isAuth = useRecoilValue(isAuthEnticatedAtom);
  const [like, setLike] = useState(data.like);

  const likeHandler = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isAuth) {
      if (like) {
        DeleteMeetLike(data.groupId)
          .then((res) => {
            if (res.status === 'SUCCESS') {
              toast.success('관심 모임에서 제거되었습니다.');
              setLike(false);
              refetchGroupList();
            }
          })
          .catch((err) => {
            toast.error('관심 모임 해제에 실패했습니다.');
          });
      } else {
        PostMeetLike(data.groupId)
          .then((res) => {
            if (res.status === 'SUCCESS') {
              toast.success('관심 모임으로 등록되었습니다.');
              setLike(true);
              refetchGroupList();
            } else if (res.status === 'ERROR') {
              toast.error(res.message);
            }
          })
          .catch((err) => {
            toast.error('관심 모임 등록에 실패했습니다.');
          });
      }
    } else {
      toast.info('로그인이 필요합니다.');
    }
  };

  return (
    <MeetSmallCardContainer onClick={onClick}>
      <img src={setDefaultImg(data.groupImg || null)} />
      <DateBadge
        totalDays={data.totalDays}
        style={{ top: '12px', left: '12px' }}
      />
      <Icon
        name={like ? 'IconModiHeartFill' : 'IconModiHeartNonFill'}
        size={20}
        style={{
          position: 'absolute',
          top: '14px',
          right: '12px',
        }}
        onClick={likeHandler}
      />
      <InfoBadge
        recruitmentCount={data.recruitmentCount}
        recruitedCount={data.recruitedCount}
        likeCount={data.likeCount}
        style={{
          left: '14px',
          top: '120px',
        }}
      />
      <div className="bg" />
      <RouteBadge
        startPoint={data.startPoint}
        endPoint={data.endPoint}
        totalDistance={data.totalDistance}
        style={{
          left: '12px',
          top: '142px',
        }}
      />

      <Text
        as="div"
        $typography="t14"
        $bold={true}
        style={{ marginTop: '8px', paddingLeft: '8px' }}
      >
        {data.title}
      </Text>

      <Text
        as="div"
        $typography="t12"
        color="grey2"
        style={{ paddingLeft: '8px', marginTop: '3px' }}
      >
        {startDateEndDateStringFormat(data.startDate, data.endDate)}
      </Text>
    </MeetSmallCardContainer>
  );
}

export default MeetSmallCard;

const MeetSmallCardContainer = styled.div`
  width: 16.6rem;
  height: 21rem;
  position: relative;
  img {
    width: 100%;
    height: 16.6rem;
    border-radius: 12px;

    border: 1px solid #e1e1e1;
    box-sizing: border-box;
  }
  .bg {
    width: 11.3rem;
    height: 5rem;
    border-radius: 0 12px 0 12px;
    background-color: rgba(0, 0, 0, 0.3);
    position: absolute;
    top: 116px;
    left: 0;
    padding: 0 6px;
  }
`;
