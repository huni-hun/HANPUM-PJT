import Header from '@/components/common/Header/Header';
import Icon from '@/components/common/Icon/Icon';
import Text from '@/components/common/Text';
import { colors } from '@/styles/colorPalette';
import styled from 'styled-components';

function MyPage() {
  return (
    <MyPageContainer>
      <Header purpose="mypage" title={'내프로필'} clickBack={() => {}} />
      <div className="profile">
        <div className="profile-img">
          <img src="" alt="" />
        </div>
        <div className="profile-info">
          <Text $typography="t16" $bold={true}>
            김동산
          </Text>
          <Text $typography="t12" color="grey2">
            프로필 보기
          </Text>
        </div>
      </div>

      <div className="section">
        <div className="activity">
          <Text $bold={true} $typography="t16">
            활동 관리
          </Text>
          <div className="activity_container">
            <div className="activity_item">
              <Icon name="IconInterestList" />
              <Text $typography="t12">관심 목록</Text>
            </div>
            <div className="activity_item">
              <Icon name="IconMyRoute" />
              <Text $typography="t12">나의 경로</Text>
            </div>
            <div className="activity_item">
              <Icon name="IconfinishedRoot" />
              <Text $typography="t12">완주한 경로</Text>
            </div>
          </div>
        </div>

        <div className="community">
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
        </div>
      </div>
    </MyPageContainer>
  );
}

export default MyPage;

const MyPageContainer = styled.div`
  width: 100vw;
  height: 100%;
  background-color: ${colors.white};

  .profile {
    display: flex;
    align-items: center;
    padding: 16px 24px;
    box-sizing: border-box;
    border-bottom: 1px solid ${colors.grey4};
    &-img {
      width: 6rem;
      height: 6rem;
      border-radius: 50%;
      background-color: ${colors.grey1};
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }

    &-info {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-left: 16px;
    }
  }

  .section {
    padding: 0 16px;

    .activity {
      margin-top: 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;

      &_container {
        padding: 16px 20px 16px 26px;
        box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0.15);
        display: flex;
        justify-content: space-between;
        border-radius: 12px;
        .activity_item {
          width: 100%;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          gap: 4px;
        }
      }
    }

    .community {
      margin-top: 26px;
      &_container {
        display: flex;
        flex-direction: column;
        gap: 13px;
        margin-top: 13px;
        .community-item {
          display: flex;
          gap: 14px;
          .icon {
            width: 2.2rem;
            height: 2.2rem;
            background-color: ${colors.grey1};
          }
        }
      }
    }
  }
`;
