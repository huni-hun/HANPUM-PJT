import * as S from '../Style/Meet/Member.styled';

function Member() {
  return (
    <S.MemberContainer>
      <div className="member-top">
        <div className="title">모임맴버</div>
        <span>인원 6/8</span>
      </div>

      <div className="member-list">
        <div className="member">
          <div className="member-img"></div>
          <div className="member-name">김땡이</div>
        </div>

        <div className="member">
          <div className="member-img"></div>
          <div className="member-name">김땡이</div>
        </div>

        <div className="member">
          <div className="member-img"></div>
          <div className="member-name">김땡이</div>
        </div>

        <div className="member">
          <div className="member-img"></div>
          <div className="member-name">김땡이</div>
        </div>

        <div className="member">
          <div className="member-img"></div>
          <div className="member-name">김땡이</div>
        </div>

        <div className="member">
          <div className="member-img"></div>
          <div className="member-name">김땡이</div>
        </div>
      </div>
    </S.MemberContainer>
  );
}

export default Member;
