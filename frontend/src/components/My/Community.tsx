import Text from '../common/Text';
import * as S from '../Style/My/Community.styled';

function Community() {
  return (
    <S.CommunityContainer>
      <Text $bold={true} $typography="t16">
        커뮤니티
      </Text>
      <div className="community_container">
        <div className="community-item">
          <div className="icon"></div>
          <Text $typography="t14" color="grey2">
            내가 작성한 게시글
          </Text>
        </div>
        <div className="community-item">
          <div className="icon"></div>
          <Text $typography="t14" color="grey2">
            내가 작성한 댓글
          </Text>
        </div>
        <div className="community-item">
          <div className="icon"></div>
          <Text $typography="t14" color="grey2">
            내가 작성한 리뷰
          </Text>
        </div>
      </div>
    </S.CommunityContainer>
  );
}

export default Community;
