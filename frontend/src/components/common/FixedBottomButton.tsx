import { colors } from '@/styles/colorPalette';

import BaseButton from './BaseButton';
import styled from 'styled-components';

interface FixedBottomButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  bottom?: string;
}

/**
 * @param {string} [label] - 버튼에 표시될 글자
 * @param {() => void} [onClick] - 버튼 클릭 시 실행될 함수
 * @param {boolean} [disabled] - 비활성화 여부
 * * @param {string} [bottom] - bottom에서 얼만큼 떨어지는지
 */
function FixedBottomButton({
  label,
  onClick,
  disabled,
  bottom,
}: FixedBottomButtonProps) {
  return (
    <Container bottom={bottom}>
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

const Container = styled.div<Pick<FixedBottomButtonProps, 'bottom'>>`
  position: fixed;
  left: 0px;
  right: 0px;
  bottom: ${(props) => (props.bottom ? `${props.bottom}rem` : '0px')};
  background-color: ${colors.white};
  padding: 20px 10px 8px;
`;

export default FixedBottomButton;
