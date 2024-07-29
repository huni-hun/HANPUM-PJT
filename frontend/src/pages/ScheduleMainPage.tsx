import { useState } from "react";
import * as S from "../components/Detail/Schedule/SchduleMainPage.styled";
import Button from "../components/common/Button/Button";

import PlusIcon from "../assets/PlusIcon.svg";

function ScheduleMainPage() {
  const BtnClick = () => {};

  const [isSelected, setIsSelected] = useState<String>("Mine");

  return (
    <S.Container>
      <S.HeaderContainer>
        <S.HeaderContent>
          <S.HeaderTitle>일정</S.HeaderTitle>
          <S.HeaderIcon src={PlusIcon} />
        </S.HeaderContent>
      </S.HeaderContainer>
      <S.SchduleTypeContainer>
        <S.SchduleTypeBox>
          <S.ScheduleType
            isSelected={isSelected === "Proceeding"}
            onClick={() => {
              setIsSelected("Proceeding");
            }}
          >
            진행중
          </S.ScheduleType>
          <S.ScheduleType
            isSelected={isSelected === "Mine"}
            onClick={() => {
              setIsSelected("Mine");
            }}
          >
            내 일정
          </S.ScheduleType>
          <S.ScheduleType
            isSelected={isSelected === "class"}
            onClick={() => {
              setIsSelected("class");
            }}
          >
            모임일정
          </S.ScheduleType>
        </S.SchduleTypeBox>
      </S.SchduleTypeContainer>
      <S.ScheduleMainContainer>
        <Button
          width={80}
          height={9}
          fontColor={"#000000"}
          backgroundColor={"#ffffff"}
          radius={1}
          fontSize={1.5}
          children={"개인 일정 추가"}
          onClick={BtnClick}
          color="#D9D9D9"
        />
      </S.ScheduleMainContainer>
    </S.Container>
  );
}

export default ScheduleMainPage;
