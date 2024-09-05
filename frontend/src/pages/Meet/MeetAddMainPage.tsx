import { ChangeEvent, useEffect, useState } from 'react';
import Icon from '../../components/common/Icon/Icon';
import * as M from '../../components/Style/Meet/MeetAddMain.styled';
import Input from '../../components/common/Input/Input';
import Header from '@/components/common/Header/Header';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ToggleSlider from '@/components/common/ToggleSlider/ToggleSlider';
import { CreateMeetRequestDto } from '@/models/meet';
import Text from '@/components/common/Text';
import BaseButton from '@/components/common/BaseButton';
import { PostGroup } from '@/api/meet/POST';
import { toast } from 'react-toastify';

function MeetAddMainPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [meetRequest, setMeetRequest] = useState<Partial<CreateMeetRequestDto>>(
    {},
  );

  const { courseId, startDate, endDate, recruitmentPeriod } =
    location.state || {};

  useEffect(() => {
    const savedMeetRequest = localStorage.getItem('meetRequest');
    if (savedMeetRequest) {
      setMeetRequest(JSON.parse(savedMeetRequest));
    }

    const savedImage = localStorage.getItem('previewImage');
    if (savedImage) {
      setPreviewImage(savedImage);
    }
  }, []);

  /** 로컬 스토리지로 input value + 이미지 저장 */
  useEffect(() => {
    localStorage.setItem('meetRequest', JSON.stringify(meetRequest));
  }, [meetRequest]);

  /** location state로 관리 */
  useEffect(() => {
    if (location.state) {
      setMeetRequest((prevState) => ({
        ...prevState,
        ...location.state,
      }));
    }
  }, [location.state]);

  /** 이미지 핸들링 */
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        if (reader.result) {
          const imageUrl = reader.result as string;
          setPreviewImage(imageUrl);
          localStorage.setItem('previewImage', imageUrl);
          setMeetRequest((prevValue) => ({
            ...prevValue,
            multipartFile: file,
          }));
        }
      };

      reader.readAsDataURL(file);
    }
  };

  /** 모임 이름, 내용 input */
  const handleInfoChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setMeetRequest({
      ...meetRequest,
      [e.target.name]: e.target.value,
    });
  };

  /** 모임 인원 toggle 슬라이드 */
  const handleRecruitmentCountChange = (count: number) => {
    setMeetRequest({
      ...meetRequest,
      recruitmentCount: count,
    });
  };

  /** 모집 마감일 페이지로 이동 */
  const clickAddDeadline = () => {
    navigate('/meet/addMain/AddDeadline', {
      state: {
        courseId,
        startDate,
        recruitmentPeriod,
      },
    });
  };

  /** 모집 일정 선택 페이지로 이동 */
  const clickAddSchdule = () => {
    navigate('/meet/addMain/addSchedule', {
      state: {
        courseId,
        startDate,
        recruitmentPeriod,
      },
    });
  };

  /** 모임 생성 post api */
  const handleCreateGroup = async () => {
    try {
      const multipartFile = previewImage;
      const groupPostReqDto = {
        title: meetRequest.title || '',
        description: meetRequest.description || '',
        recruitmentCount: meetRequest.recruitmentCount || 0,
        recruitmentPeriod: recruitmentPeriod || '',
        /** 일정쪽 */
        schedulePostReqDto: {
          courseId: courseId || 0,
          startDate: startDate || '',
        },
      };

      const response = await PostGroup(multipartFile || '', groupPostReqDto);

      if (response && response.status === 'SUCCESS') {
        toast.success('모임 생성이 완료되었습니다!');
        navigate('/schedule/success');
      } else {
        toast.error('모임 생성에 실패했습니다.');
      }
    } catch (error) {
      toast.error('모임 생성 중 오류가 발생했습니다.');
    }
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
              value={meetRequest?.title || ''}
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
              value={meetRequest?.description || ''}
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

        <div className="category-container" onClick={clickAddDeadline}>
          <Text $bold={true} $typography="t12">
            모집 마감일
          </Text>
          <M.ScheduleTextWrap>
            <M.ScheduleText>{recruitmentPeriod}</M.ScheduleText>
            <Icon name="IconArrowRight" />
          </M.ScheduleTextWrap>
        </div>

        <div className="category-container" onClick={clickAddSchdule}>
          <Text $bold={true} $typography="t12">
            일정
          </Text>
          <M.ScheduleTextWrap>
            {/* 일정에서 날짜를 선택안했을 때 (여기에 조건 추가해서 경로 붙이면 될듯 합니다) */}
            {startDate !== undefined && (
              <M.ScheduleText>
                {startDate} - {endDate}
              </M.ScheduleText>
            )}

            <Icon name="IconArrowRight" />
          </M.ScheduleTextWrap>
        </div>

        <div className="btn-box">
          <BaseButton size="large" onClick={handleCreateGroup}>
            모임 생성하기
          </BaseButton>
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
