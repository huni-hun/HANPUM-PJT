import Header from '@/components/common/Header/Header';
import Icon from '@/components/common/Icon/Icon';
import Text from '@/components/common/Text';
import { colors } from '@/styles/colorPalette';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import img from '../../assets/img/img1.jpg';
import ProfileItem from '@/components/My/ProfileItem';
import { useQuery } from 'react-query';
import { GetUser } from '@/api/mypage/GET';
import { STATUS } from '@/constants';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

function MyProfilePage() {
  const navigate = useNavigate();

  const { data, error, isLoading } = useQuery(
    'getUser', // Query Key
    () => GetUser(), // API 호출 함수
    {
      onSuccess: (res) => {
        if (res.status === STATUS.success) {
          toast.success(res.message);
        } else if (res.status === STATUS.error) {
          toast.error(res.message);
        }
      },
      onError: (error: AxiosError) => {
        toast.error(error.message);
      },
    },
  );

  console.log(data);

  return (
    <MyProfilePageContainer>
      <Header
        purpose="title"
        title="내 프로필"
        clickBack={() => {
          navigate(-1);
        }}
      />

      <div className="profile">
        <div className="profile-prev_img">
          {/* {previewImage && (
            <img src={previewImage} alt="프로필 이미지 미리보기" />
          )} */}

          <img src={img} alt="프로필 이미지 미리보기" />
          <div className="profile-icon_box">
            {/* <input type="file" accept="image/*" onChange={handleImageChange} /> */}
            <input type="file" accept="image/*" />
            <Icon name="IconCamera" size={19} />
          </div>
        </div>
      </div>

      <div className="info-container">
        <ProfileItem label="닉네임" value="김동산" param="nickname" />
        <ProfileItem label="이름" value="김한품" param="name" />
        <ProfileItem label="이메일" value="admin@hanpum.com" param="email" />
        <ProfileItem label="전화번호" value="010-1234-5678" param="telphone" />
        <ProfileItem label="생년월일" value="1988년8월18일" param="birth" />
        <ProfileItem label="성별" value="남성" param="gender" />
        <ProfileItem label="소셜로그인" value="hanpum@kakao.com" />
      </div>
    </MyProfilePageContainer>
  );
}

export default MyProfilePage;

const MyProfilePageContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${colors.white};
  padding-bottom: 23.7rem;
  .profile {
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;
    border-bottom: 1px solid ${colors.grey4};
    padding-bottom: 16px;
    &-prev_img {
      margin-top: 12px;
      width: 10.3rem;
      height: 10.3rem;
      border-radius: 50%;
      background-color: ${colors.grey1};
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }

      .profile-icon_box {
        width: 3.4rem;
        height: 3.4rem;
        border: 1px solid ${colors.white};
        background-color: ${colors.grey2};
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(20px, 15px);
        svg {
          transform: translate(2px, -1px);
        }
        input {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          opacity: 0;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1;
        }
      }
    }
  }

  .info-container {
    display: flex;
    flex-direction: column;
    padding: 4px 24px 0px;
    box-sizing: border-box;
    gap: 17px;
    background-color: ${colors.white};
  }
`;
