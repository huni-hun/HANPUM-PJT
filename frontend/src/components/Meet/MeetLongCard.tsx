import { MeetInfo } from '@/models/meet';
import DateBadge from '../common/Badge/DateBadge';
import InfoBadge from '../common/Badge/InfoBadge';
import RouteBadge from '../common/Badge/RouteBadge';
import Icon from '../common/Icon/Icon';
import Text from '../common/Text';
import styled from 'styled-components';

function MeetLongCard({ data }: { data: MeetInfo }) {
  // console.log(data);

  if (!data) {
    return null;
  }
  return (
    <MeetLongCardContainer>
      <img src={data.groupImg} alt="" />
      <DateBadge
        style={{ top: '16px', left: '20px' }}
        totalDays={data.totalDays}
      />
      {data.like ? (
        <Icon
          name="IconHeartWhiteFill"
          size={20}
          style={{
            position: 'absolute',
            top: '18px',
            right: '20px',
            zIndex: '3',
          }}
        />
      ) : (
        <Icon
          name="IconHeartWhiteBorder"
          size={20}
          style={{
            position: 'absolute',
            top: '18px',
            right: '20px',
            zIndex: '3',
          }}
        />
      )}

      <Text
        $typography="t14"
        color="white"
        $bold={true}
        style={{
          position: 'absolute',
          bottom: '34px',
          left: '20px',
          zIndex: 3,
        }}
      >
        {data.title}
      </Text>
      <InfoBadge
        style={{ bottom: '20px', right: '20px' }}
        recruitmentCount={data.recruitmentCount}
        recruitedCount={data.recruitedCount}
        likeCount={data.likeCount}
      />
      <RouteBadge
        style={{ bottom: '20px', left: '20px' }}
        startPoint={data.startPoint}
        endPoint={data.endPoint}
        totalDistance={data.totalDistance}
      />
      <div className="black-bg" />
    </MeetLongCardContainer>
  );
}

export default MeetLongCard;

const MeetLongCardContainer = styled.div`
  width: 100%;
  height: 16rem;
  border-radius: 20px;
  margin: 16px 0 24px;
  position: relative;
  overflow: hidden;

  .black-bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 2;
  }

  img {
    width: 100%;
    height: 100%;
  }
`;
