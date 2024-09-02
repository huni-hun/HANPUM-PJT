import { useState } from 'react';
import Button from '../../components/common/Button/Button';
import Icon from '../../components/common/Icon/Icon';
import * as M from '../../components/Style/Meet/MeetAddMain.styled';
import Input from '../../components/common/Input/Input';
import Header from '@/components/common/Header/Header';
import { colors } from '@/styles/colorPalette';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ToggleSlider from '@/components/common/ToggleSlider/ToggleSlider';
import ArrowIcon from '../../assets/icons/Arrow.svg';

function MeetAddMainPage() {
  const navigator = useNavigate();

  const [imgBoxClick, setImgBoxClick] = useState<boolean>(false);
  const [imgReady, setImgReady] = useState<boolean>(false);
  const [explanationBoxClick, setExplanationBoxClick] =
    useState<boolean>(false);
  const [imgSrc, setImgSrc] = useState<string>('');
  const [explanationReady, setExplanationReady] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [typeBoxClick, setTypeBoxClick] = useState<boolean>(false);

  const [meetTitle, setMeetTitle] = useState<string>('');
  const [meetExplane, setMeetExplane] = useState<string>('');

  return (
    <MainPageContainer>
      <Header purpose="title" title="모임 생성" clickBack={() => {}} />
      <M.MainContainer>
        <M.OverFlow>
          <M.ImgCardOpen>
            <M.ImgCardTitle>배경 사진을 선택해주세요.</M.ImgCardTitle>
            <M.ImgContainer>
              <M.ImgBox
                onClick={() => {
                  document.getElementById('Img')?.click();
                }}
              >
                {imgSrc === '' ? (
                  <Icon name="IconCameraGrey" size={80} />
                ) : (
                  <M.Img src={imgSrc} />
                )}
                <M.FileSelect
                  id="Img"
                  onChange={(e) => {
                    if (e.target.files) {
                      const file = e.target.files[0];
                      const reader = new FileReader();
                      reader.readAsDataURL(file);

                      reader.onload = () => {
                        if (reader.result !== null) {
                          setImgSrc(reader.result?.toString());
                        }
                      };

                      setImgReady(true);
                    }
                  }}
                  accept="image/*"
                  type="file"
                />
              </M.ImgBox>
            </M.ImgContainer>
          </M.ImgCardOpen>

          <M.ExplanationCardOpen>
            <M.ExplanationCardTitle>모임 이름</M.ExplanationCardTitle>
            <Input
              value={meetTitle}
              width={78}
              style={{
                border: '0.2rem solid #d9d9d9',
                marginTop: '1rem',
                marginBottom: '1rem',
              }}
              onChange={(e) => {
                setMeetTitle(e.target.value);
              }}
            />
            <M.ExplanationCardTitle style={{ marginTop: '1rem' }}>
              모임 설명
            </M.ExplanationCardTitle>
            <M.ExplanationRoute
              value={meetExplane}
              onChange={(e) => {
                setMeetExplane(e.target.value);
                if (meetTitle !== '') {
                  setExplanationReady(true);
                }
              }}
            />
            <M.ToggleSliderBox>
              <ToggleSlider
                title="모집인원"
                unit="인"
                min={3}
                max={15}
                value={0}
                onChange={(value) => console.log(`소요일차: ${value}일`)}
              />
            </M.ToggleSliderBox>
          </M.ExplanationCardOpen>
          <M.SelectEctInfoBox>
            <M.DeadLineBox>
              <span>모집 마감일</span>
              <img src={ArrowIcon} />
            </M.DeadLineBox>
            <M.ScheduleBox>
              <span>일정</span>
              <img src={ArrowIcon} />
            </M.ScheduleBox>
          </M.SelectEctInfoBox>
        </M.OverFlow>
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
