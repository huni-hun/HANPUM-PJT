import * as Bt from "./BottomTab.styled";
import testLogo from "../logo.svg";

function BottomTab() {
  return (
    <Bt.BottomTab>
      <Bt.BottomTabItem onClick={() => {}}>
        <Bt.BottomTabIcon src={testLogo} />
        <Bt.BottomTabTitle>메인</Bt.BottomTabTitle>
      </Bt.BottomTabItem>
      <Bt.BottomTabItem onClick={() => {}}>
        <Bt.BottomTabIcon src={testLogo} />
        <Bt.BottomTabTitle>모임</Bt.BottomTabTitle>
      </Bt.BottomTabItem>
      <Bt.BottomTabItem onClick={() => {}}>
        <Bt.BottomTabIcon src={testLogo} />
        <Bt.BottomTabTitle>커뮤니티</Bt.BottomTabTitle>
      </Bt.BottomTabItem>
      <Bt.BottomTabItem onClick={() => {}}>
        <Bt.BottomTabIcon src={testLogo} />
        <Bt.BottomTabTitle>내 정보</Bt.BottomTabTitle>
      </Bt.BottomTabItem>
    </Bt.BottomTab>
  );
}

export default BottomTab;
