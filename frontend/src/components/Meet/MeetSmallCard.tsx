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

function MeetSmallCard({ data }: { data: MeetInfo }) {
  const navigate = useNavigate();
  return (
    <MeetSmallCardContainer
      onClick={() => {
        navigate(`/meet/:${data.groupId}`);
      }}
    >
      <img src={data.groupImg} alt="그룹 이미지" />
      <DateBadge totalDays={3} style={{ top: '12px', left: '12px' }} />
      <Icon
        name="IconHeartWhiteBorder"
        size={20}
        style={{
          position: 'absolute',
          top: '14px',
          right: '12px',
        }}
      />
      <InfoBadge
        recruitmentCount={10}
        recruitedCount={5}
        likeCount={7}
        style={{
          left: '14px',
          top: '120px',
        }}
      />
      <div className="bg" />
      <RouteBadge
        startPoint={data.startPoint}
        endPoint={data.endPoint}
        totalDistance={23.5}
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
