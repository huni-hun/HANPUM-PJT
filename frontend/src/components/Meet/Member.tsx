import * as S from '../Style/Meet/Member.styled';

interface MemberProps {
  memberData: {
    id: number;
    name: string;
    img: string;
  }[];
}

function Member({ memberData }: MemberProps) {
  return (
    <S.MemberContainer>
      <div className="member-top">
        <div className="title">모임 맴버</div>
        <span>인원 {memberData.length}/8</span>
      </div>

      <div className="member-list">
        {memberData.map((member) => (
          <div className="member" key={member.id}>
            <div className="member-img">
              <img src={member.img} alt={member.name} />
            </div>
            <div className="member-name">{member.name}</div>
          </div>
        ))}
      </div>
    </S.MemberContainer>
  );
}

export default Member;
