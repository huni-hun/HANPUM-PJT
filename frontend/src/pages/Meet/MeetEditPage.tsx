import { ChangeEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import Icon from '../../components/common/Icon/Icon';
import * as M from '../../components/Style/Meet/MeetAddMain.styled';
import Input from '../../components/common/Input/Input';
import Header from '@/components/common/Header/Header';
import ToggleSlider from '@/components/common/ToggleSlider/ToggleSlider';
import Text from '@/components/common/Text';
import BaseButton from '@/components/common/BaseButton';
import { CreateMeetRequestDto, MeetInfo } from '@/models/meet';
import { GetMeetDetailList } from '@/api/meet/GET';
import { PutGroup } from '@/api/meet/PUT';
import useImageCompression from '@/hooks/global/useImageCompression';

function MeetEditPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { compressImage, compressedImage } = useImageCompression();
  const {
    groupId: stateGroupId,
    courseId,
    startDate,
    endDate,
    recruitmentPeriod,
    isEdit,
  } = location.state || {};
  const { state } = location;

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [multipartFile, setMultipartFile] = useState<File | string | undefined>(
    undefined,
  );
  const [meetRequest, setMeetRequest] = useState<Partial<CreateMeetRequestDto>>(
    {},
  );
  const [detailData, setDetailData] = useState<MeetInfo>();
  const [loading, setLoading] = useState<boolean>(false);
  const [groupId, setGroupId] = useState<number | null>(stateGroupId || null);

  useEffect(() => {
    if (state && state.meetEditRequest) {
      setMeetRequest(state.meetEditRequest);
    } else {
      const savedMeetRequest = localStorage.getItem('meetEditRequest');
      if (savedMeetRequest) {
        setMeetRequest(JSON.parse(savedMeetRequest));
      }
    }
  }, [state]);

  useEffect(() => {
    // 로컬 스토리지에서 데이터 로드
    const savedMeetRequest = localStorage.getItem('meetEditRequest');
    if (savedMeetRequest) {
      setMeetRequest(JSON.parse(savedMeetRequest));
    }

    const savedImage = localStorage.getItem('previewImage');
    if (savedImage) {
      setPreviewImage(savedImage);
    }

    if (!stateGroupId) {
      const savedGroupId = localStorage.getItem('groupId');
      if (savedGroupId) {
        setGroupId(JSON.parse(savedGroupId));
      }
    }

    if (groupId && !detailData) {
      fetchData();
    }
  }, [stateGroupId, groupId, detailData]);

  useEffect(() => {
    // `meetRequest`가 변경될 때 로컬 스토리지 업데이트
    localStorage.setItem('meetEditRequest', JSON.stringify(meetRequest));
  }, [meetRequest]);

  const fetchData = async () => {
    if (!groupId) return;
    if (!isEdit) {
      try {
        setLoading(true);
        const response = await GetMeetDetailList(groupId);
        if (response?.status === 'SUCCESS') {
          setDetailData(response.data);
          setPreviewImage(response.data.groupImg);
          setMeetRequest({
            multipartFile: response.data.groupImg,
            title: response.data.title,
            description: response.data.description,
            recruitmentCount: response.data.recruitmentCount,
            recruitmentPeriod: response.data.recruitmentPeriod,
          });
          // 로컬 스토리지에 초기값 저장
          localStorage.setItem(
            'meetEditRequest',
            JSON.stringify({
              multipartFile: response.data.groupImg,
              title: response.data.title,
              description: response.data.description,
              recruitmentCount: response.data.recruitmentCount,
              recruitmentPeriod: response.data.recruitmentPeriod,
            }),
          );
        } else if (response?.status === 'ERROR') {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error('에러 발생');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          const imageUrl = reader.result as string;
          setPreviewImage(imageUrl);
          localStorage.setItem('previewImage', imageUrl);
          setMeetRequest((prev) => ({
            ...prev,
            multipartFile: file,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInfoChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setMeetRequest((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRecruitmentCountChange = (count: number) => {
    setMeetRequest((prev) => ({
      ...prev,
      recruitmentCount: count,
    }));
  };

  const clickAddDeadline = () => {
    localStorage.setItem('meetEditRequest', JSON.stringify(meetRequest));
    navigate('/meet/addMain/AddDeadline', {
      state: {
        courseId,
        startDate,
        recruitmentPeriod: meetRequest.recruitmentPeriod,
        isEdit: true,
      },
    });
  };

  const handleEditGroup = async () => {
    if (!groupId) return;

    try {
      const groupPostReqDto = {
        title: meetRequest.title || '',
        description: meetRequest.description || '',
        recruitmentCount: meetRequest.recruitmentCount || 0,
        recruitmentPeriod: meetRequest.recruitmentPeriod || '',
      };

      const response = await PutGroup(
        groupId,
        previewImage || '',
        groupPostReqDto,
      );

      if (response?.status === 'SUCCESS') {
        toast.success('모임 수정이 완료되었습니다!');
        navigate('/schedule/success');
        // 수정 완료 후, 로컬 스토리지에서 관련 항목 제거
        localStorage.removeItem('meetEditRequest');
        localStorage.removeItem('previewImage');
        localStorage.removeItem('groupId');
      } else if (response.status === 'ERROR') {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error('모임 수정 중 오류가 발생했습니다.');
    }
  };

  const handleBackClick = () => {
    const groupId = localStorage.getItem('groupId');

    localStorage.removeItem('meetEditRequest');
    localStorage.removeItem('previewImage');
    navigate('/meet/detail', {
      state: { groupId: groupId ? Number(groupId) : '' },
    });
  };

  return (
    <>
      <Header
        purpose="title"
        title="모임 수정"
        $isborder={true}
        clickBack={handleBackClick}
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
                placeholder="김동산"
                name="title"
                value={meetRequest.title || ''}
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
                value={meetRequest.description || ''}
                onChange={handleInfoChange}
              />
            </div>
            <M.ToggleSliderBox>
              <ToggleSlider
                title="모집인원"
                unit="인"
                min={0}
                max={15}
                value={meetRequest.recruitmentCount || 0}
                onChange={handleRecruitmentCountChange}
              />
            </M.ToggleSliderBox>
          </div>

          <div className="category-container" onClick={clickAddDeadline}>
            <Text $bold={true} $typography="t12">
              모집 마감일
            </Text>
            <M.ScheduleTextWrap>
              <M.ScheduleText>{meetRequest.recruitmentPeriod}</M.ScheduleText>
              <Icon name="IconArrowRight" />
            </M.ScheduleTextWrap>
          </div>

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
