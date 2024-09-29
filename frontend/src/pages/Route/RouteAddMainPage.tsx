import { useState } from 'react';
import Button from '../../components/common/Button/Button';
import Icon from '../../components/common/Icon/Icon';
import * as R from '../../components/Style/Route/RouteAddMainPage.styled';
import Input from '../../components/common/Input/Input';
import Header from '@/components/common/Header/Header';
import { colors } from '@/styles/colorPalette';
import { useNavigate } from 'react-router-dom';
import useImageCompression from '@/hooks/global/useImageCompression';
import { convertImageToFile } from '@/utils/util';
import { setDefaultImg } from '@/utils/Image';

function RouteAddMainPage() {
  const navigator = useNavigate();

  const [imgBoxClick, setImgBoxClick] = useState<boolean>(false);
  const [imgReady, setImgReady] = useState<boolean>(false);
  const [explanationBoxClick, setExplanationBoxClick] =
    useState<boolean>(false);
  const [imgSrc, setImgSrc] = useState<string>('');
  const [imgData, setImgData] = useState<File>(null!);
  const [explanationReady, setExplanationReady] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [typeBoxClick, setTypeBoxClick] = useState<boolean>(false);

  const [routeTitle, setRouteTitle] = useState<string>('');
  const [routeExplane, setRouteExplane] = useState<string>('');

  const typeArr = [
    '해안길',
    '도시탐방',
    '역사탐방',
    '자연탐방',
    '초보자',
    '숙련자',
    '잦은휴식',
    '짧은코스',
    '긴코스',
    '문화탐방',
    '미식투어',
    '사진명소',
    '힐링코스',
    '문화재길',
    '제주올레길',
    'DMZ접경지역',
    '해파랑길코스',
    '코리아둘레길코스',
    '서해랑길코스',
  ];
  const [typeChecked, setTypeChecked] = useState<string[]>([]);
  const { compressImage, compressedImage } = useImageCompression();

  return (
    <R.Container>
      <Header
        purpose="title"
        title="기본정보 입력"
        clickBack={() => {
          navigator(-1);
        }}
        $isGrey={true}
      />
      <R.MainContainer>
        <R.OverFlow>
          {!imgBoxClick ? (
            <R.CardClosed
              height={imgReady ? 14 : 2}
              onClick={() => {
                setImgBoxClick(true);
              }}
            >
              <R.CardTitle>배경 사진</R.CardTitle>
              {imgReady && (
                <R.CardCloseImg>
                  <R.Img src={imgSrc} />
                </R.CardCloseImg>
              )}
            </R.CardClosed>
          ) : (
            <R.ImgCardOpen>
              <R.ImgCardTitle>배경 사진을 선택해주세요.</R.ImgCardTitle>
              <R.ImgContainer>
                <R.ImgBox
                  onClick={() => {
                    document.getElementById('Img')?.click();
                  }}
                >
                  {imgSrc === '' ? (
                    <Icon name="IconCameraGrey" size={80} />
                  ) : (
                    <R.Img src={imgSrc} />
                  )}
                  <R.FileSelect
                    id="Img"
                    onChange={async (e) => {
                      if (e.target.files) {
                        const file = e.target.files[0];
                        const compressedFile =
                          (await compressImage(file)) ?? file;

                        const reader = URL.createObjectURL(compressedFile);
                        // console.log(reader);
                        setImgData(compressedFile);
                        setImgSrc(reader);

                        setImgReady(true);
                      }
                    }}
                    accept="image/*"
                    type="file"
                  />
                </R.ImgBox>
              </R.ImgContainer>
              <R.ImgBtnBox>
                <Button
                  width={25}
                  height={6}
                  fc="ffffff"
                  bc={imgReady ? '#1A823B' : '#D9D9D9'}
                  radius={0.7}
                  fontSize={1.6}
                  children="등록"
                  color="#ffffff"
                  onClick={() => {
                    if (imgReady) {
                      setImgBoxClick(false);
                    }
                  }}
                />
              </R.ImgBtnBox>
            </R.ImgCardOpen>
          )}
          {!explanationBoxClick ? (
            <R.CardClosed
              height={explanationReady ? 16 : 2}
              onClick={() => {
                setExplanationBoxClick(true);
              }}
            >
              {!explanationReady ? (
                <R.CardTitle>경로 설명*</R.CardTitle>
              ) : (
                <R.RouteCardHeader>
                  <R.CardTitle>경로명</R.CardTitle>
                  <R.RouteName>{routeTitle}</R.RouteName>
                </R.RouteCardHeader>
              )}
              {!explanationReady ? null : (
                <R.RouteCardMain>
                  <R.RouteExplane defaultValue={routeExplane} />
                </R.RouteCardMain>
              )}
            </R.CardClosed>
          ) : (
            <R.ExplanationCardOpen>
              <R.ExplanationCardTitle>
                경로명을 입력해주세요.
              </R.ExplanationCardTitle>
              <Input
                value={routeTitle}
                width={78}
                style={{
                  border: '0.2rem solid #d9d9d9',
                  marginTop: '1rem',
                  marginBottom: '1rem',
                }}
                onChange={(e) => {
                  setRouteTitle(e.target.value);
                }}
              />
              <R.ExplanationCardTitle>
                경로를 간단하게 설명해주세요.
              </R.ExplanationCardTitle>
              <R.ExplanationRoute
                value={routeExplane}
                onChange={(e) => {
                  setRouteExplane(e.target.value);
                }}
              />
              <R.ImgBtnBox>
                <Button
                  width={25}
                  height={6}
                  fc="ffffff"
                  bc={
                    routeExplane.length > 0 && routeTitle.length > 0
                      ? '#1A823B'
                      : '#D9D9D9'
                  }
                  radius={0.7}
                  fontSize={1.6}
                  children="등록"
                  color="#ffffff"
                  onClick={() => {
                    if (routeExplane.length > 0 && routeTitle.length > 0) {
                      setExplanationBoxClick(false);
                      setExplanationReady(true);
                    }
                  }}
                />
              </R.ImgBtnBox>
            </R.ExplanationCardOpen>
          )}
          {!typeBoxClick ? (
            <R.CardClosed
              height={typeChecked.length > 0 ? 16 : 2}
              onClick={() => {
                setTypeBoxClick(true);
              }}
            >
              <R.CardTitle>경로 타입</R.CardTitle>
              <R.TypeClosedCard>
                {typeChecked.length > 0 &&
                  typeChecked.map((ele) => (
                    <R.CheckedTypeCard $isLong={ele.length > 3}>
                      <R.TypeTextBox>
                        <R.TypeText>{ele}</R.TypeText>
                      </R.TypeTextBox>
                    </R.CheckedTypeCard>
                  ))}
              </R.TypeClosedCard>
            </R.CardClosed>
          ) : (
            <R.TypeCardOpen $isChecked={typeChecked.length > 0}>
              <R.ExplanationCardTitle>
                경로 타입을 선택해주세요.
              </R.ExplanationCardTitle>
              {typeChecked.length > 0 ? (
                <R.CheckedTypeContainer>
                  {typeChecked.map((ele) => (
                    <R.CheckedTypeCard
                      onClick={() => {
                        let arr = [...typeChecked];
                        let newArr: string[] = [];
                        arr.map((e) => {
                          if (e !== ele) {
                            newArr.push(e);
                          }
                        });

                        setTypeChecked(newArr);
                      }}
                      $isLong={ele.length > 3}
                      key={ele}
                    >
                      <R.TypeTextBox>
                        <R.TypeText>{ele}</R.TypeText>
                      </R.TypeTextBox>
                      <R.TypeText>X</R.TypeText>
                    </R.CheckedTypeCard>
                  ))}
                </R.CheckedTypeContainer>
              ) : null}
              <R.TypeContainer>
                {typeArr.map((ele) => (
                  <R.CheckBoxContainer
                    onClick={() => {
                      if (typeChecked.length < 5) {
                        if (!typeChecked.includes(ele)) {
                          setTypeChecked((pre) => [...pre, ele]);
                        } else {
                          let arr = [...typeChecked];
                          let newArr: string[] = [];
                          arr.map((e) => {
                            if (e != ele) {
                              newArr.push(e);
                            }
                          });

                          setTypeChecked(newArr);
                        }
                      }
                    }}
                    key={ele}
                  >
                    <R.TypeCheckBox
                      key={ele}
                      defaultChecked={typeChecked.includes(ele)}
                      type="checkbox"
                    />
                    <R.TypeLabel>{ele}</R.TypeLabel>
                  </R.CheckBoxContainer>
                ))}
              </R.TypeContainer>
              <R.TypeBtnBox>
                <Button
                  width={25}
                  height={6}
                  fc="ffffff"
                  bc={typeChecked.length > 0 ? '#1A823B' : '#D9D9D9'}
                  radius={0.7}
                  fontSize={1.6}
                  children="등록"
                  color="#ffffff"
                  onClick={() => {
                    if (typeChecked.length > 0) {
                      setTypeBoxClick(false);
                    }
                  }}
                />
              </R.TypeBtnBox>
            </R.TypeCardOpen>
          )}
        </R.OverFlow>
      </R.MainContainer>
      <R.BottomContainer>
        <R.ButtonBox>
          <R.SwitchBtnBox>
            <R.SwitchBtnText>공개 여부</R.SwitchBtnText>
            <R.SwitchLabel $isOpen={isOpen}>
              <R.SwitchInput
                type="checkbox"
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
              />
              <R.SwitchButton $isOpen={isOpen} />
            </R.SwitchLabel>
          </R.SwitchBtnBox>
          <Button
            width={25}
            height={6}
            fc="ffffff"
            bc={explanationReady ? colors.main : colors.grey2}
            radius={0.7}
            fontSize={1.6}
            children="다음"
            color="#ffffff"
            onClick={async () => {
              if (explanationReady) {
                navigator('/route/addDetail', {
                  state: {
                    imgSrc:
                      imgSrc !== ''
                        ? imgData
                        : await convertImageToFile(
                            setDefaultImg(imgSrc || null),
                          ),
                    typeChecked: typeChecked,
                    routeTitle: routeTitle,
                    routeExplane: routeExplane,
                    isOpen: isOpen,
                  },
                });
              }
            }}
          />
        </R.ButtonBox>
      </R.BottomContainer>
    </R.Container>
  );
}

export default RouteAddMainPage;
