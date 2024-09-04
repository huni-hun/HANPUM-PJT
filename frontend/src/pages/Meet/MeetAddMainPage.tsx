import { ChangeEvent, useState } from 'react';
import Icon from '../../components/common/Icon/Icon';
import * as M from '../../components/Style/Meet/MeetAddMain.styled';
import Input from '../../components/common/Input/Input';
import Header from '@/components/common/Header/Header';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ToggleSlider from '@/components/common/ToggleSlider/ToggleSlider';
import { CreateMeetRequestDto } from '@/models/meet';
import Text from '@/components/common/Text';
import BaseButton from '@/components/common/BaseButton';

function MeetAddMainPage() {
  const navigate = useNavigate();

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [meetRequest, setMeetRequest] = useState<Partial<CreateMeetRequestDto>>(
    {},
  );

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);

      setMeetRequest((prevValue) => ({
        ...prevValue,
        multipartFile: file,
      }));
    }
  };

  console.log(meetRequest);

  const handleInfoChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.currentTarget;

    setMeetRequest((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleRecruitmentCountChange = (value: number) => {
    setMeetRequest((prev) => ({
      ...prev,
      recruitmentCount: value,
    }));
  };

  return (
    <MainPageContainer>
      <Header
        purpose="title"
        title="모임 생성"
        $isborder={true}
        clickBack={() => {
          navigate(-1);
        }}
      />
      <M.MainContainer>
        <div className="form">
          <div className="container">
            <Text $typography="t12" $bold>
              모임 이미지
            </Text>
            <div className="img-box">
              {previewImage ? (
                <img src={previewImage} alt="프로필 이미지 미리보기" />
              ) : (
                <Icon name="IconCameraGrey" width={52} height={38} />
              )}

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>

          <div className="container">
            <Text $typography="t12" $bold>
              모임 이름
            </Text>
            <Input
              placeholder="김동산"
              name="title"
              value={meetRequest?.title}
              onChange={handleInfoChange}
            />
          </div>

          <div className="container">
            <Text $typography="t12" $bold>
              모임 내용
            </Text>
            <textarea
              placeholder="내용을 작성해 주세요."
              name="description"
              value={meetRequest?.description}
              onChange={handleInfoChange}
            />
          </div>
          <M.ToggleSliderBox>
            <ToggleSlider
              title="모집인원"
              unit="인"
              min={0}
              max={15}
              value={meetRequest?.recruitmentCount || 0}
              onChange={handleRecruitmentCountChange}
            />
          </M.ToggleSliderBox>
        </div>

        <div className="category-container">
          <Text $bold={true} $typography="t12">
            모집 마감일
          </Text>
          <Icon name="IconArrowRight" />
        </div>

        <div className="category-container">
          <Text $bold={true} $typography="t12">
            일정
          </Text>
          <Icon name="IconArrowRight" />
        </div>

        <div className="btn-box">
          <BaseButton size="large">모임 생성하기</BaseButton>
        </div>
      </M.MainContainer>
    </MainPageContainer>
  );
}

export default MeetAddMainPage;
const MainPageContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
`;
