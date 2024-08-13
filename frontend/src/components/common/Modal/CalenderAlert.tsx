import { colors } from '@styles/colorPalette';
import Dimmed from './Dimmed';
import Text from '../Text';
import Flex from '../Flex';
import BaseButton from '../BaseButton';
import styled from 'styled-components';

interface AlertProps {
  open?: boolean;
  title?: React.ReactNode;
  description?: React.ReactNode;
  buttonConfirm?: string;
  buttonCancel?: string;
  element?: React.ReactNode;
  onButtonClick: () => void;
}

function CalenderAlert({
  open,
  title,
  description,
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
        {title && (
          <Text
            $typography="t10"
            $bold={true}
            display="block"
            style={{ marginBottom: 6 }}
          >
            {title}
          </Text>
        )}
        {description && <Text $typography="t10">{description}</Text>}
        {element}
        <Flex>
          {buttonCancel && (
            <BaseButton
              color="cancel"
              onClick={onButtonClick}
              style={{ flex: 1, borderRadius: '0' }}
            >
              {buttonCancel}
            </BaseButton>
          )}
          {buttonConfirm && (
            <BaseButton
              onClick={onButtonClick}
              style={{ flex: 1, borderRadius: '0' }}
            >
              {buttonConfirm}
            </BaseButton>
          )}
        </Flex>
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
  box-sizing: border-box;
  /* box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; */
  box-shadow:
    rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
`;

export default CalenderAlert;
