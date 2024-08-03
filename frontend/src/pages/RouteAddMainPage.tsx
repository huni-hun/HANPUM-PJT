import { useState } from "react";
import Button from "../components/common/Button/Button";
import Icon from "../components/common/Icon/Icon";
import * as R from "../components/Detail/Route/RouteAddMainPage.styled";
import Input from "../components/common/Input/Input";

function RouteAddMainPage() {
  const [imgBoxClick, setImgBoxClick] = useState<boolean>(false);
  const [imgReady, setImgReady] = useState<boolean>(false);
  const [explanationBoxClick, setExplanationBoxClick] = useState<boolean>(false);
  const [explanationReady, setExplanationReady] = useState<boolean>(false);

  const [routeTitle, setRouteTitle] = useState<string>("");
  const [routeExplane, setRouteExplane] = useState<string>("");

  return (
    <R.Container>
      <R.Header>
        <R.HeaderButton>
          <Icon name="IconBack" size={20} />
        </R.HeaderButton>
      </R.Header>
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
              {imgReady && <R.CardCloseImg />}
            </R.CardClosed>
          ) : (
            <R.ImgCardOpen>
              <R.ImgCardTitle>배경 사진을 선택해주세요.</R.ImgCardTitle>
              <R.ImgContainer>
                <R.ImgBox
                  onClick={() => {
                    setImgReady(true);
                  }}
                />
              </R.ImgContainer>
              <R.ImgBtnBox>
                <Button
                  width={25}
                  height={6}
                  fontColor="ffffff"
                  backgroundColor={imgReady ? "#1A823B" : "#D9D9D9"}
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
                <R.CardTitle>경로 설명</R.CardTitle>
              ) : (
                <R.RouteCardHeader>
                  <R.CardTitle>경로명</R.CardTitle>
                  <R.RouteName>{routeTitle}</R.RouteName>
                </R.RouteCardHeader>
              )}
              {!explanationReady ? null : (
                <R.RouteCardMain>
                  <R.RouteExplane value={routeExplane} />
                </R.RouteCardMain>
              )}
            </R.CardClosed>
          ) : (
            <R.ExplanationCardOpen>
              <R.ExplanationCardTitle>경로명을 입력해주세요.</R.ExplanationCardTitle>
              <Input
                value={routeTitle}
                size="sm"
                width={78}
                style={{ border: "0.2rem solid #d9d9d9", marginTop: "1rem", marginBottom: "1rem" }}
                onChange={(e) => {
                  setRouteTitle(e.target.value);
                }}
              />
              <R.ExplanationCardTitle>경로를 간단하게 설명해주세요.</R.ExplanationCardTitle>
              <R.ExplanationRoute
                value={routeExplane}
                onChange={(e) => {
                  setRouteExplane(e.target.value);
                  if (routeTitle != "") {
                    setExplanationReady(true);
                  }
                }}
              />
              <R.ImgBtnBox>
                <Button
                  width={25}
                  height={6}
                  fontColor="ffffff"
                  backgroundColor={explanationReady ? "#1A823B" : "#D9D9D9"}
                  radius={0.7}
                  fontSize={1.6}
                  children="등록"
                  color="#ffffff"
                  onClick={() => {
                    if (explanationReady) {
                      setExplanationBoxClick(false);
                    }
                  }}
                />
              </R.ImgBtnBox>
            </R.ExplanationCardOpen>
          )}
          <R.CardClosed height={2}>
            <R.CardTitle>경로 타입</R.CardTitle>
          </R.CardClosed>
          <R.CardClosed height={2}>
            <R.CardTitle>경로 등록</R.CardTitle>
          </R.CardClosed>
        </R.OverFlow>
      </R.MainContainer>
      <R.BottomContainer>
        <R.ButtonBox>
          <Button
            width={25}
            height={6}
            fontColor="ffffff"
            backgroundColor="#D9D9D9"
            radius={0.7}
            fontSize={1.6}
            children="다음"
            color="#ffffff"
            onClick={() => {}}
          />
        </R.ButtonBox>
      </R.BottomContainer>
    </R.Container>
  );
}

export default RouteAddMainPage;
