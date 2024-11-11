import { GetUser } from '@/api/mypage/GET';
import { Logout } from '@/api/signup/POST';
import { isAuthEnticatedAtom } from '@/atoms/isAuthEnticatedAtom';
import BaseButton from '@/components/common/BaseButton';
import BottomTab from '@/components/common/BottomTab/BottomTab';
import Flex from '@/components/common/Flex';
import Header from '@/components/common/Header/Header';
import Text from '@/components/common/Text';
import Activity from '@/components/My/Activity';
import ConfigItem from '@/components/My/config/ConfigItem';
import { STATUS } from '@/constants';
import { colors } from '@/styles/colorPalette';
import { AxiosError } from 'axios';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import banner_flag from '@imgs/banner_flag.png';
import banner_shoes from '@imgs/banner_shoes.png';

function MyPage() {
  const navigate = useNavigate();
  const setAuthEnticate = useSetRecoilState(isAuthEnticatedAtom);

  const { data } = useQuery('getUser', GetUser);
  // console.log(data);

  const { mutate: logout } = useMutation(Logout, {
    onSuccess: (res) => {
      if (res.status === STATUS.success) {
        toast.success(res.message);
        localStorage.removeItem('token');
        navigate('/login');
        setAuthEnticate(false);
        sessionStorage.removeItem('send');
      }
      if (res.status === STATUS.error) {
        toast.error(res.message);
      }
    },
    onError: (error: AxiosError) => {
      toast.error(error.message);
    },
  });

  const clickLogout = () => {
    logout();
  };

  return (
    <MyPageContainer>
      <Header
        purpose="mypage"
        title={'내프로필'}
        clickBack={() => {
          navigate('/home');
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
            <div className="container">
              <Flex direction="column" style={{ paddingBottom: '0.4rem' }}>
                <Text
                  as="div"
                  $bold={true}
                  $typography="t16"
                  style={{ marginBottom: '1.6rem' }}
                >
                  안내
                </Text>
                <ConfigItem label="공지사항" url="/config/:announcement" />
                <ConfigItem label="이용약관 및 정책" url="/config/:policy" />
              </Flex>
            </div>

            <div className="container">
              <Flex direction="column">
                <Text
                  as="div"
                  $bold={true}
                  $typography="t16"
                  style={{ marginBottom: '1.6rem' }}
                >
                  계정
                </Text>
                <ConfigItem label="비밀번호 변경" url="/config/:pw" />
                <ConfigItem label="회원탈퇴" url="/config/:withdraw" />
              </Flex>
            </div>

            <div className="logout-container">
              <BaseButton size="large" onClick={clickLogout}>
                로그아웃
              </BaseButton>
            </div>
          </div>
          <div className="banner">
            <Text $typography="t14" $bold={true} style={{ marginTop: '20px' }}>
              걷기 여행 안전수칙이 궁금하신가요?
            </Text>
            <BaseButton
              size="banner"
              style={{ zIndex: 1 }}
              onClick={() => {
                window.location.href =
                  'https://www.durunubi.kr/safe-trail-guide.do';
              }}
            >
              걷기 여행 안전수칙 확인하기
            </BaseButton>
            <img className="flag" src={banner_flag} alt="" />
            <img className="shoes" src={banner_shoes} alt="" />
          </div>
        </>
      )}
      <BottomTab />
    </MyPageContainer>
  );
}

export default MyPage;

const MyPageContainer = styled.div`
  width: 100vw;
  /* height: 100%;*/
  background-color: ${colors.white};
  min-height: 850px;

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

    background-color: ${colors.white};
    margin-bottom: 20px;

    .logout-container {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 3rem;
      /* padding-bottom: 3.6rem; */
    }
  }

  .banner {
    width: 100%;
    /* height: 105px; */
    background-color: #dcd8dd;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    /* justify-content: center; */
    /* padding-bottom: 7rem; */
    /* margin-bottom: 7rem; */
    gap: 8px;
    position: relative;
    overflow: hidden;
    /* padding-bottom: 5.7rem; */
    img {
      position: absolute;
    }
    .flag {
      top: 13px;
      right: -6px;
    }
    .shoes {
      left: -20px;
      top: -10px;
      width: 97px;
    }
  }
`;
