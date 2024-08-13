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
  buttonLabel?: string;
  element?: React.ReactNode;
  onButtonClick: () => void;
}

function Alert({
  open,
  title,
  description,
  buttonLabel = '확인',
  onButtonClick,
}: AlertProps) {
  if (open === false) {
    return null;
  }

  return (
    <Dimmed>
      <AlertContainer>
        {title && (
          <Text
            $typography="t16"
            $bold={true}
            display="block"
            style={{ marginBottom: 6 }}
          >
            {title}
          </Text>
        )}
        {description && <Text $typography="t10">{description}</Text>}

        <Flex $justify="flex-end">
          <BaseButton
            onClick={onButtonClick}
            $weak={true}
            style={{ marginTop: 12, border: 'none' }}
          >
            {buttonLabel}
          </BaseButton>
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
  padding: 24px;
  box-sizing: border-box;
`;

export default Alert;
