/** 모임 - 필터 */

import { useState } from 'react';
import * as M from '@/components/Style/Meet/MeetFilter.styled';
import * as R from '../../components/Style/Route/RouteAddDetailPage.styled';
import Header from '@/components/common/Header/Header';

import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import FilterTable from '@/components/Meet/FilterTable';
import { colors } from '@/styles/colorPalette';
import ToggleSlider from '@/components/common/ToggleSlider/ToggleSlider';
import Icon from '@/components/common/Icon/Icon';
import { useRecoilState } from 'recoil';
import { meetFilterInfoAtom } from '@/atoms/meetFilterAtom';
import Flex from '@/components/common/Flex';
import Text from '@/components/common/Text';
import BaseButton from '@/components/common/BaseButton';

function MeetFilterPage() {
  const navigate = useNavigate();

  const [meetFilterInfo, setMeetFilterInfo] =
    useRecoilState(meetFilterInfoAtom);

  const [selectedField, setSelectedField] = useState<
    'startPoint' | 'endPoint' | null
  >(null);

  /** location table에서 cell 선택시 지역 뽑기 */
  const locationFilterClick = (location: string) => {
    if (selectedField === 'startPoint') {
      setMeetFilterInfo((prev) => ({
        ...prev,
        startPoint: location,
      }));
    } else if (selectedField === 'endPoint') {
      setMeetFilterInfo((prev) => ({
        ...prev,
        endPoint: location,
      }));
    }
    setSelectedField(null);
  };

  const revertInfo = () => {
    setMeetFilterInfo({
      startPoint: '',
      endPoint: '',
      maxTotalDays: 0,
      maxRecruitmentCount: 0,
    });
  };

  const handleTotalDaysChange = (value: number) => {
    setMeetFilterInfo((prev) => ({
      ...prev,
      maxTotalDays: value,
    }));
  };

  const handleRecruitmentCountChange = (value: number) => {
    setMeetFilterInfo((prev) => ({
      ...prev,
      maxRecruitmentCount: value,
    }));
  };

  return (
    <MeetFilterPageContainer>
      <Header
        purpose="title"
        title="필터"
        $isborder={true}
        clickBack={() => navigate(-1)}
      />

      <div className="container">
        <div className="location-box">
          <div
            className="location-item"
            onClick={() => setSelectedField('startPoint')}
          >
            <Text
              $typography="t12"
              color={meetFilterInfo?.startPoint ? 'black' : 'grey1'}
              $bold={true}
            >
              출발지
            </Text>
            <Text $typography="t14">
              {meetFilterInfo?.startPoint || '정보 없음'}
            </Text>
          </div>

          <div className="arrow-box">
            <Icon name="IconArrowBlack" width={9} height={6} />
          </div>

          <div
            className="location-item"
            onClick={() => setSelectedField('endPoint')}
          >
            <Text
              $typography="t12"
              color={meetFilterInfo?.endPoint ? 'black' : 'grey1'}
              $bold={true}
            >
              도착지
            </Text>
            <Text $typography="t14">
              {meetFilterInfo?.endPoint || '정보 없음'}
            </Text>
          </div>
        </div>

        <FilterTable
          locationFilterClick={locationFilterClick}
          canClick={selectedField !== null}
        />

        <M.ToggleSliderBox>
          <ToggleSlider
            title="일정기간"
            unit="일"
            min={0}
            max={15}
            value={meetFilterInfo.maxTotalDays || 0}
            onChange={handleTotalDaysChange}
          />
          <ToggleSlider
            title="모임인원"
            unit="인"
            min={0}
            max={15}
            value={meetFilterInfo.maxRecruitmentCount || 0}
            onChange={handleRecruitmentCountChange}
          />
        </M.ToggleSliderBox>
      </div>

      <div className="apply_btn-container">
        <Flex
          style={{ width: 'auto' }}
          $align="center"
          $gap={6}
          onClick={revertInfo}
        >
          <Icon name="IconRevert" />
          <Text $typography="t14" $bold={true}>
            초기화
          </Text>
        </Flex>
        <BaseButton
          size="apply"
          fontSize={1.7}
          // $weak={!sendAuthCode}

          onClick={() => {
            navigate('/meet/list');
          }}
        >
          필터 적용
        </BaseButton>
      </div>

      <R.BottomContainer>
        {/* <R.ButtonBox> */}
        <M.ButtonBox>
          <Flex
            style={{ width: 'auto' }}
            $align="center"
            $gap={6}
            onClick={revertInfo}
          >
            <Icon name="IconRevert" />
            <Text $typography="t14" $bold={true}>
              초기화
            </Text>
          </Flex>
          <BaseButton
            size="apply"
            fontSize={1.7}
            // $weak={!sendAuthCode}

            onClick={() => {
              navigate('/meet/list');
            }}
          >
            필터 적용
          </BaseButton>
        </M.ButtonBox>
        {/* </R.ButtonBox> */}
      </R.BottomContainer>
    </MeetFilterPageContainer>
  );
}

export default MeetFilterPage;

const MeetFilterPageContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  overflow: hidden;
  .container {
    padding: 0 16px;
    display: flex;
    flex-direction: column;

    .location-box {
      padding: 0 8px;
      position: relative;
      display: flex;
      gap: 3px;
      margin-top: 20px;
      .location-item {
        width: 16.2rem;
        height: 6.4rem;
        background-color: #f3f4f8;
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-left: 20px;
        gap: 5px;
      }
    }
    .arrow-box {
      position: absolute;
      top: 24px;
      left: 50%;
      transform: translateX(-50%);
      width: 1.6rem;
      height: 1.6rem;
      border-radius: 50%;
      background-color: ${colors.white};
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .apply_btn-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    gap: 18px;
    bottom: 0;
    width: 100%;
    padding: 1.5rem 0;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 16px;
  }
`;
