import { ChangeEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { meetCreateImage } from '@/atoms/meetRequestAtom';
import { PostGroup } from '@/api/meet/POST';
import useImageCompression from '@/hooks/global/useImageCompression';
import {
  CreateMeetProps,
  CreateMeetRequestDto,
  groupPostReqDtoProps,
  schedulePostReqDto,
} from '@/models/meet';
import Header from '@/components/common/Header/Header';
import Icon from '../../components/common/Icon/Icon';
import Input from '../../components/common/Input/Input';
import Text from '@/components/common/Text';
import BaseButton from '@/components/common/BaseButton';
import ToggleSlider from '@/components/common/ToggleSlider/ToggleSlider';
import * as M from '../../components/Style/Meet/MeetAddMain.styled';

function MeetAddMainPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { compressImage } = useImageCompression();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [meetRequest, setMeetRequest] = useState<Partial<CreateMeetRequestDto>>(
    {},
  );
  const [multipartImg, setMultipartImg] = useRecoilState(meetCreateImage);
  const [meetData, setMeetData] = useState<CreateMeetProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { courseId, startDate, endDate, recruitmentPeriod, start, end } =
    location.state || {};

  // 로컬 스토리지에서 값 로드
  useEffect(() => {
    const savedMeetRequest = localStorage.getItem('meetRequest');
    const savedImage = localStorage.getItem('previewImage');

    if (savedMeetRequest) {
      setMeetRequest(JSON.parse(savedMeetRequest));
    }

    if (savedImage) {
      setPreviewImage(savedImage);
    }

    setIsLoading(false);
  }, []);

  // meetRequest 상태가 변경될 때마다 로컬 스토리지 업데이트 및 meetData 생성
  useEffect(() => {
    if (Object.keys(meetRequest).length > 0) {
      localStorage.setItem('meetRequest', JSON.stringify(meetRequest));
    }

    if (previewImage !== null) {
      localStorage.setItem('previewImage', previewImage);
    } else {
      localStorage.removeItem('previewImage');
    }

    // meetRequest 상태에 필요한 값들이 모두 있는지 확인하고 meetData 생성
    if (
      meetRequest.title &&
      meetRequest.description &&
      meetRequest.recruitmentCount &&
      recruitmentPeriod &&
      startDate
    ) {
      const schedulePostReqDto: schedulePostReqDto = {
        courseId: Number(courseId),
        startDate: startDate?.replace(/-/g, ''),
      };

      const groupPostReqDto: groupPostReqDtoProps = {
        title: meetRequest.title,
        description: meetRequest.description,
        recruitmentCount: meetRequest.recruitmentCount,
        recruitmentPeriod: recruitmentPeriod,
        schedulePostReqDto: schedulePostReqDto,
      };

      setMeetData({
        groupPostReqDto: groupPostReqDto,
        multipartFile: previewImage || '',
      });
    } else {
      setMeetData(null);
    }
  }, [meetRequest, previewImage]);

  // location state로 상태 설정
  useEffect(() => {
    if (location.state) {
      setMeetRequest((prevState) => ({
        ...prevState,
        ...location.state,
      }));
    }
  }, [location.state]);

  // 이미지 핸들링
  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const compressedFile = (await compressImage(file)) ?? file;
      const url = URL.createObjectURL(compressedFile);

      setPreviewImage(url);
      setMultipartImg(compressedFile);
      setMeetRequest((prevValue) => ({
        ...prevValue,
        multipartFile: compressedFile,
      }));
    }
  };

  // 모임 정보 변경 핸들링
  const handleInfoChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setMeetRequest({
      ...meetRequest,
      [e.target.name]: e.target.value,
    });
  };

  // 모집 인원 변경 핸들링
  const handleRecruitmentCountChange = (count: number) => {
    setMeetRequest({
      ...meetRequest,
      recruitmentCount: count,
    });
  };

  // 페이지 이동 전에 로컬 스토리지에 저장
  const saveToLocalStorage = () => {
    localStorage.setItem('meetRequest', JSON.stringify(meetRequest));
    localStorage.setItem('previewImage', previewImage || '');
  };

  // 모집 마감일 페이지로 이동
  const clickAddDeadline = () => {
    saveToLocalStorage(); // 로컬 스토리지에 현재 상태 저장
    navigate('/meet/addMain/AddDeadline', {
      state: {
        courseId,
        startDate,
        recruitmentPeriod,
        previewImage,
      },
    });
  };

  // 모집 일정 선택 페이지로 이동
  const clickAddSchedule = () => {
    saveToLocalStorage(); // 로컬 스토리지에 현재 상태 저장
    navigate('/meet/addMain/addSchedule', {
      state: {
        courseId,
        startDate,
        recruitmentPeriod,
        previewImage,
      },
    });
  };

  const resetAndNavigate = (path: string, options?: { state?: any }) => {
    setMultipartImg(null);
    navigate(path, options);
  };

  // 모임 생성 API 호출
  const handleCreateGroup = async () => {
    if (!meetData) {
      toast.error('모임 데이터를 확인할 수 없습니다.');
      return;
    }

    try {
      const response = await PostGroup(meetData, multipartImg || undefined);
      if (response && response.status === 'SUCCESS') {
        toast.success('모임 생성이 완료되었습니다!');
        navigate('/meet/addMain/complete', {
          state: {
            category: 'create',
          },
        });
        // 로컬 스토리지 초기화
        localStorage.removeItem('meetRequest');
        localStorage.removeItem('previewImage');
        // resetAndNavigate('/meet/addMain/complete'); // 초기화 후 페이지 이동
        resetAndNavigate('/meet/addMain/complete', {
          state: {
            category: 'create',
          },
        });
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error('모임 생성 중 오류가 발생했습니다.');
    }
  };

  // 로딩 중일 때 로딩 상태 표시
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const clickBack = () => {
    localStorage.removeItem('meetRequest');
    localStorage.removeItem('previewImage');
    resetAndNavigate('/meet/list');
  };

  return (
    <>
      <Header
        purpose="title"
        title="모임 생성"
        $isborder={true}
        clickBack={clickBack}
      />
      <MainPageContainer>
        <M.MainContainer>
          <div className="form">
            <div className="container">
              <Text $typography="t12" $bold>
                모임 이미지
              </Text>
              <div className="img-box">
                {previewImage ? (
                  <img src={previewImage} alt="preview" />
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
                placeholder="제목을 작성해주세요."
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
                style={{ fontSize: '1.4rem' }}
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

          <div className="category-container" onClick={clickAddSchedule}>
            <Text $bold={true} $typography="t12">
              일정
            </Text>
            <div className="schedule-info">
              <M.ScheduleTextWrap>
                {startDate && (
                  <M.ScheduleText>
                    {startDate} - {endDate}
                  </M.ScheduleText>
                )}
                <Icon name="IconArrowRight" />
              </M.ScheduleTextWrap>
              <M.ScheduleTextWrap>
                {start && (
                  <M.ScheduleText>
                    {start} - {end}
                  </M.ScheduleText>
                )}
              </M.ScheduleTextWrap>
            </div>
          </div>

          <div className="btn-box">
            <BaseButton size="large" onClick={handleCreateGroup}>
              모임 생성하기
            </BaseButton>
          </div>
        </M.MainContainer>
      </MainPageContainer>
    </>
  );
}

export default MeetAddMainPage;

const MainPageContainer = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  overflow-y: auto;
`;
