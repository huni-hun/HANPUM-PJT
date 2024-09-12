import { ChangeEvent, useEffect, useState } from 'react';
import Icon from '../../components/common/Icon/Icon';
import * as M from '../../components/Style/Meet/MeetAddMain.styled';
import Input from '../../components/common/Input/Input';
import Header from '@/components/common/Header/Header';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ToggleSlider from '@/components/common/ToggleSlider/ToggleSlider';
import {
  CreateMeetProps,
  CreateMeetRequestDto,
  groupPostReqDtoProps,
  schedulePostReqDto,
} from '@/models/meet';
import Text from '@/components/common/Text';
import BaseButton from '@/components/common/BaseButton';
import { PostGroup } from '@/api/meet/POST';
import { toast } from 'react-toastify';
import useImageCompression from '@/hooks/global/useImageCompression';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { meetCreateImage } from '@/atoms/meetRequestAtom';

function MeetAddMainPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { compressImage, compressedImage } = useImageCompression();
  const [previewImage, setPreviewImage] = useState<string>(null!);
  const [meetRequest, setMeetRequest] = useState<Partial<CreateMeetRequestDto>>(
    {},
  );

  const [multipartImg, setMultipartImg] = useRecoilState(meetCreateImage);

  const [meetData, setMeetData] = useState<CreateMeetProps>(null!);

  const { courseId, startDate, endDate, recruitmentPeriod, start, end } =
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
    const schedulePostReqDto: schedulePostReqDto = {
      courseId: Number(courseId),
      startDate: startDate?.replace(/-/g, ''),
    };
    const groupPostReqDto: groupPostReqDtoProps = {
      title: meetRequest.title || '',
      description: meetRequest.description || '',
      recruitmentCount: meetRequest.recruitmentCount || 0,
      recruitmentPeriod: recruitmentPeriod,
      // /** 일정쪽 */
      schedulePostReqDto: schedulePostReqDto,
    };
    const meetdata: CreateMeetProps = {
      multipartFile: previewImage,
      groupPostReqDto: groupPostReqDto,
      // schedulePostReqDto,
    };

    setMeetData(meetdata);
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
  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const compressedFile = (await compressImage(file)) ?? file;
      console.log(compressedFile);

      const url = URL.createObjectURL(compressedFile || file);

      setPreviewImage(url);
      // localStorage.setItem('previewImage', url);

      setMultipartImg(compressedFile);
      localStorage.setItem('previewImage', url);
      setMeetRequest((prevValue) => ({
        ...prevValue,
        multipartFile: compressedFile || file,
      }));
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
        previewImage,
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
        previewImage,
      },
    });
  };
  /** 모임 생성 post api */
  const handleCreateGroup = async () => {
    try {
      // 필수 데이터가 있는지 확인
      if (!previewImage) {
        toast.info('모임 이미지를 업로드해주세요!');
        return;
      }

      if (!meetRequest.title) {
        toast.info('모임 이름을 작성해주세요!');
        return;
      }

      if (!meetRequest.description) {
        toast.info('모임 내용을 작성해주세요!');
        return;
      }

      if (!meetRequest.recruitmentCount || meetRequest.recruitmentCount === 0) {
        toast.info('모집인원을 설정해주세요!');
        return;
      }

      if (!recruitmentPeriod) {
        toast.info('모집 마감일을 설정해주세요!');
        return;
      }

      if (!startDate || !endDate) {
        toast.info('일정을 설정해주세요!');
        return;
      }

      if (multipartImg) {
        const response = await PostGroup(multipartImg, meetData);
        if (response && response.status === 'SUCCESS') {
          toast.success('모임 생성이 완료되었습니다!');
          navigate('/meet/addMain/complete', {
            state: {
              category: 'create',
            },
          });
          localStorage.removeItem('meetRequest');
          localStorage.removeItem('previewImage');
        } else {
          toast.error(response.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error('모임 생성 중 오류가 발생했습니다.');
    }
  };

  return (
    <>
      <Header
        purpose="title"
        title="모임 생성"
        $isborder={true}
        clickBack={() => {
          localStorage.removeItem('meetRequest');
          localStorage.removeItem('previewImage');
          navigate('/meet/list');
        }}
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

          <div className="category-container" onClick={clickAddSchdule}>
            <Text $bold={true} $typography="t12">
              일정
            </Text>
            <div className="schedule-info">
              <M.ScheduleTextWrap>
                {startDate !== undefined && (
                  <M.ScheduleText>
                    {startDate} - {endDate}
                  </M.ScheduleText>
                )}

                <Icon name="IconArrowRight" />
              </M.ScheduleTextWrap>
              <M.ScheduleTextWrap>
                {start !== undefined && (
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
