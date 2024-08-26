import Text from '../common/Text';
import * as S from '../Style/My/ProfileItem.styled';

function ProfileItem({ label, value }: { label: string; value: string }) {
  return (
    <S.ProfileItemContainer className="info-item">
      <Text $typography="t14" color="grey2" style={{ width: '7.7rem' }}>
        {label}
      </Text>
      <div className="info">{value}</div>
    </S.ProfileItemContainer>
  );
}

export default ProfileItem;
