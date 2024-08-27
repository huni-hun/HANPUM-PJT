import { GetUser } from '@/api/mypage/GET';
import Header from '@/components/common/Header/Header';
import Text from '@/components/common/Text';
import Activity from '@/components/My/Activity';
import Community from '@/components/My/Community';
import { STATUS } from '@/constants';
import { colors } from '@/styles/colorPalette';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';

function MyPage() {
  const navigate = useNavigate();

  const { data } = useQuery(
    'getUser', // Query Key
    GetUser,
    {
      onSuccess: (res) => {
        console.log('res ::', res.data);
        if (res.status === STATUS.success) {
        } else if (res.status === STATUS.error) {
          toast.error(res.message);
        }
      },
      onError: (error: AxiosError) => {
        toast.error(error.message);
      },
    },
  );
  return (
    <MyPageContainer>
      <Header
        purpose="mypage"
        title={'내프로필'}
        clickBack={() => {
          navigate(-1);
        }}
      />

      {data && (
        <>
          <div className="profile">
            <div className="profile-img">
              <img src={data.data.profilePicture} alt="프로필 이미지" />
            </div>
            <div className="profile-info">
              <Text $typography="t16" $bold={true}>
                {data.data.name}
              </Text>
              <Text
                $typography="t12"
                color="grey2"
                onClick={() => {
                  navigate('/myprofile');
                }}
              >
                프로필 보기
              </Text>
            </div>
          </div>

          <div className="section">
            <Activity />
            <Community />
          </div>
        </>
      )}
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
  }
`;
