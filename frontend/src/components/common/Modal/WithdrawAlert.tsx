import { colors } from '@styles/colorPalette';
import Dimmed from './Dimmed';
import Text from '../Text';
import Flex from '../Flex';
import BaseButton from '../BaseButton';
import styled from 'styled-components';
import warning from '../../../assets/img/warning.png';

interface AlertProps {
  open?: boolean;
  title?: React.ReactNode;
  description?: React.ReactNode;
  buttonConfirm?: string;
  buttonCancel?: string;
  element?: React.ReactNode;
  onButtonClick: (cancel?: boolean) => void;
}

function WithdrawAlert({
  open,
  buttonConfirm = '확인',
  buttonCancel = '취소',
  onButtonClick,
  element,
}: AlertProps) {
  if (open === false) {
    return null;
  }

  return (
    <Dimmed>
      <AlertContainer>
        <div className="container">
          <img src={warning} alt="경고 이미지" />
          <Text
            $typography="t20"
            $bold={true}
            style={{ margin: '24px 0 12px' }}
          >
            정말 탈퇴하시겠습니까?
          </Text>
          <Text $typography="t16">한 번 탈퇴하면</Text>
          <Text $typography="t16" style={{ margin: '6px 0 16px' }}>
            정보 복구가 불가능합니다.
          </Text>

          <Flex $gap={5}>
            {buttonCancel && (
              <BaseButton
                style={{ width: '14.5rem' }}
                color="cancel"
                onClick={() => onButtonClick(true)}
              >
                {buttonCancel}
              </BaseButton>
            )}
            {buttonConfirm && (
              <BaseButton
                style={{ width: '14.5rem' }}
                onClick={() => onButtonClick(false)}
              >
                {buttonConfirm}
              </BaseButton>
            )}
          </Flex>
        </div>
      </AlertContainer>
    </Dimmed>
  );
}

const AlertContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: ${colors.white};
  border-radius: 12px;
  overflow: hidden;
  z-index: var(--alert-zindex);
  width: 32.7rem;
  height: 27.6rem;
  box-sizing: border-box;
  background-color: ${colors.white};
  /* box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; */
  box-shadow:
    rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  background-color: ${colors.white};

  .container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px 16px;
    box-sizing: border-box;
    img {
      width: 6.7rem;
      height: 6.7rem;
    }
  }
`;

export default WithdrawAlert;
