import { colors } from '@/styles/colorPalette';

import { createPortal } from 'react-dom';
import BaseButton from './BaseButton';
import styled, { css } from 'styled-components';

interface FixedBottomButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

function FixedBottomButton({
  label,
  onClick,
  disabled,
}: FixedBottomButtonProps) {
  return (
    <Container>
      <BaseButton
        size="medium"
        full={true}
        onClick={onClick}
        disabled={disabled}
      >
        {label}
      </BaseButton>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background-color: ${colors.white};
  padding: 20px 10px 8px;
`;

const buttonStyles = css`
  border-radius: 8px;
`;

export default FixedBottomButton;
