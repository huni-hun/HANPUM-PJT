import { ChangeEvent, useEffect, useState } from 'react';
import Icon from '../../components/common/Icon/Icon';
import * as M from '../../components/Style/Meet/MeetAddMain.styled';
import Input from '../../components/common/Input/Input';
import Header from '@/components/common/Header/Header';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ToggleSlider from '@/components/common/ToggleSlider/ToggleSlider';
import { CreateMeetProps, groupPostReqDtoProps, MeetInfo } from '@/models/meet';
import Text from '@/components/common/Text';
import BaseButton from '@/components/common/BaseButton';
import { toast } from 'react-toastify';
import useImageCompression from '@/hooks/global/useImageCompression';
import { useRecoilState } from 'recoil';
import { meetCreateImage, meetRequestState } from '@/atoms/meetRequestAtom';
import { GetMeetDetailList } from '@/api/meet/GET';
import { PutGroup } from '@/api/meet/PUT';

function MeetEditPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { compressImage } = useImageCompression();
  const [multipartImg, setMultipartImg] = useRecoilState(meetCreateImage);
  const [meetRequest, setMeetRequest] = useRecoilState(meetRequestState);
  const [detailData, setDetailData] = useState<MeetInfo>();
  const [initialData, setInitialData] = useState<MeetInfo>();
  const [previewImage, setPreviewImage] = useState<string>('');
  const [meetData, setMeetData] = useState<CreateMeetProps>(null!);
  const [loading, setLoading] = useState<boolean>(false);

  const savedGroupId = localStorage.getItem('groupId');
  const groupIdNumber = savedGroupId ? Number(JSON.parse(savedGroupId)) : null;
  const [groupId, setGroupId] = useState<number | null>(groupIdNumber);

  useEffect(() => {
    if (!groupId) {
      const savedGroupId = localStorage.getItem('groupId');
      if (savedGroupId) {
        setGroupId(Number(JSON.parse(savedGroupId)));
      }
    }
  }, [groupId]);

  const { courseId, startDate, recruitmentPeriod } = location.state || {};

  // 페이지 로드 시 로컬 스토리지에서 상태 복원
  useEffect(() => {
    const savedRequest = localStorage.getItem('savedMeetRequest');
    const savedPreviewImage = localStorage.getItem('savedPreviewImage');
    if (savedRequest && savedPreviewImage) {
      setMeetRequest(JSON.parse(savedRequest));
      setPreviewImage(savedPreviewImage);
    } else {
      fetchData(); // 로컬 스토리지에 저장된 값이 없으면 fetchData 호출
    }
  }, [groupId]);

  // 데이터 fetch 후 meetRequest 초기화 및 초기 데이터 저장
  const fetchData = async () => {
    if (!groupId) return;
    try {
      setLoading(true);
      const response = await GetMeetDetailList(groupId);
      if (response?.status === 'SUCCESS') {
        setDetailData(response.data);
        setInitialData(response.data); // 초기 데이터를 저장
        setPreviewImage(response.data.groupImg);
        setMeetRequest((prevRequest) => ({
          ...prevRequest,
          multipartFile: response.data.groupImg,
          title: response.data.title,
          description: response.data.description,
          recruitmentCount: response.data.recruitmentCount,
          recruitmentPeriod: response.data.recruitmentPeriod,
        }));
      } else if (response?.status === 'ERROR') {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error('에러 발생');
    } finally {
      setLoading(false);
    }
  };

  // location.state와 관련된 상태 반영
  useEffect(() => {
    if (location.state) {
      setMeetRequest((prevState) => ({
        ...prevState,
        ...location.state.meetRequest,
      }));
      if (location.state.previewImage) {
        setPreviewImage(location.state.previewImage); // URL 복원
      }
    }
  }, [location.state]);

  // 모집 마감일 state와 recruitmentPeriod 비교하여 업데이트
  useEffect(() => {
    if (location.state?.recruitmentPeriod) {
      setMeetRequest((prevState) => ({
        ...prevState,
        recruitmentPeriod: location.state.recruitmentPeriod,
      }));
    }
  }, [location.state?.recruitmentPeriod]);

  // meetRequest의 상태가 변경될 때마다 meetData 업데이트 및 로컬 스토리지 저장
  useEffect(() => {
    const groupPostReqDto: groupPostReqDtoProps = {
      title: meetRequest.title || '',
      description: meetRequest.description || '',
      recruitmentCount: meetRequest.recruitmentCount || 0,
      recruitmentPeriod: meetRequest.recruitmentPeriod || '',
    };
    const meetdata: CreateMeetProps = {
      multipartFile: previewImage,
      groupPostReqDto: groupPostReqDto,
    };
    setMeetData(meetdata);
    // meetRequest 상태를 로컬 스토리지에 저장
    localStorage.setItem('savedMeetRequest', JSON.stringify(meetRequest));
    localStorage.setItem('savedPreviewImage', previewImage);
  }, [meetRequest, previewImage]);

  /** 이미지 핸들링 */
  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const compressedFile = (await compressImage(file)) ?? file;
      const url = URL.createObjectURL(compressedFile || file);
      setPreviewImage(url);
      setMultipartImg(compressedFile);
      setMeetRequest((prevValue) => ({
        ...prevValue,
        multipartFile: compressedFile || file,
      }));
    }
  };

  /** 모집 마감일 페이지로 이동 */
  const clickAddDeadline = () => {
    if (!multipartImg && !previewImage) {
      setPreviewImage(detailData?.groupImg || '');
    }
    if (groupId) {
      localStorage.setItem('groupId', JSON.stringify(groupId));
    }

    // 현재 meetRequest와 previewImage를 로컬 스토리지에 저장
    localStorage.setItem('savedMeetRequest', JSON.stringify(meetRequest));
    localStorage.setItem('savedPreviewImage', previewImage);

    navigate('/meet/addMain/AddDeadline', {
      state: {
        courseId,
        startDate,
        recruitmentPeriod: meetRequest?.recruitmentPeriod || recruitmentPeriod,
        isEdit: true,
        meetRequest,
        previewImage,
      },
    });
  };

  /** 모임 수정 put api */
  const handleEditGroup = async () => {
    if (groupId) {
      try {
        if (!meetRequest.title) {
          toast.info('모임 이름을 작성해주세요!');
          return;
        }

        if (!meetRequest.description) {
          toast.info('모임 내용을 작성해주세요!');
          return;
        }

        if (
          !meetRequest.recruitmentCount ||
          meetRequest.recruitmentCount === 0
        ) {
          toast.info('모집인원을 설정해주세요!');
          return;
        }

        const recruitmentPeriodValue =
          recruitmentPeriod || meetRequest?.recruitmentPeriod;
        if (!recruitmentPeriodValue) {
          toast.info('모집 마감일을 설정해주세요!');
          return;
        }

        const response = await PutGroup(
          groupId,
          meetData,
          multipartImg || undefined,
        );
        if (response && response.status === 'SUCCESS') {
          toast.success('모임 수정이 완료되었습니다!');
          navigate('/meet/addMain/complete', {
            state: {
              category: 'edit',
              groupId: groupId,
            },
          });
          setMeetRequest({});
          setMultipartImg(null);
          // 저장된 로컬 스토리지 데이터 삭제
          localStorage.removeItem('savedMeetRequest');
          localStorage.removeItem('savedPreviewImage');
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error('모임 수정 중 오류가 발생했습니다.');
      }
    }
  };

  /** 모임 이름, 내용 input 핸들러 */
  const handleInfoChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setMeetRequest((prevRequest) => ({
      ...prevRequest,
      [name]: value,
    }));
  };

  /** 모집 인원 슬라이더 핸들러 */
  const handleRecruitmentCountChange = (count: number) => {
    setMeetRequest((prevRequest) => ({
      ...prevRequest,
      recruitmentCount: count,
    }));
  };

  // console.log(previewImage, '?');

  return (
    <>
      <Header
        purpose="title"
        title="모임 수정"
        $isborder={true}
        clickBack={() => {
          setMeetRequest(initialData || {}); // 초기 데이터를 복원
          setMultipartImg(null);
          navigate('/meet/detail', {
            state: {
              groupId: groupId,
            },
          });
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
                {previewImage !== 'null' ? (
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

            {/* 모임 정보 */}
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

          {/* 모집 마감일 */}
          <div className="category-container" onClick={clickAddDeadline}>
            <Text $bold={true} $typography="t12">
              모집 마감일
            </Text>
            <M.ScheduleTextWrap>
              <M.ScheduleText>{meetRequest?.recruitmentPeriod}</M.ScheduleText>
              <Icon name="IconArrowRight" />
            </M.ScheduleTextWrap>
          </div>

          {/* 수정 버튼 */}
          <div className="btn-box">
            <BaseButton size="large" onClick={handleEditGroup}>
              모임 수정하기
            </BaseButton>
          </div>
        </M.MainContainer>
      </MainPageContainer>
    </>
  );
}

export default MeetEditPage;

const MainPageContainer = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  overflow-y: auto;
`;
