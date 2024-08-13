import {
  FocusEventHandler,
  forwardRef,
  InputHTMLAttributes,
  useEffect,
  useState,
} from 'react';
import * as S from './TextField.styled';
import Input from '@common/Input/Input';
import Text from '@common/Text';
import Flex from '../Flex';
import Spacing from '../Spacing';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  hasError?: boolean;
  helpMessage?: React.ReactNode;
  rightElement?: React.ReactNode;
  bottomElement?: React.ReactNode;
  hasTimer?: string;
}

/**
 * @param {React.ReactNode} [label] label 값
 * @param {boolean} [hasError] error가 있는지 여부
 * @param {React.ReactNode} [helpMessage] input 하단에 글자
 * @param {React.ReactNode} [rightElement] 우측의 요소
 * @param {React.ReactNode} [rightElement] 하단의 요소
 */

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    {
      label,
      hasError,
      rightElement,
      bottomElement,
      helpMessage,
      onFocus,
      onBlur,
      hasTimer,
      ...props
    },
    ref,
  ) {
    const [focused, setFocused] = useState(false);

    // 우선 순위 : 에러 > focus > 기본
    const labelColor = hasError ? 'red' : focused ? 'main' : 'grey2';

    const handleFocus: FocusEventHandler<HTMLInputElement> = (event) => {
      setFocused(true);
      onFocus?.(event);
    };
    const handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
      setFocused(false);
      onBlur?.(event);
    };

    return (
      <S.TextFieldContainer>
        {label ? (
          <Text
            $typography="t12"
            display="block"
            $bold={true}
            style={{ marginBottom: 12 }}
          >
            {label}
          </Text>
        ) : null}

        <Flex $align="center">
          {hasTimer && <span className="timer">{hasTimer}</span>}
          <Input
            autoComplete="off"
            ref={ref}
            aria-invalid={hasError}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />

          {rightElement}
        </Flex>

        {helpMessage && (
          <Text
            $typography="t10"
            color={labelColor}
            display="inline-block"
            style={{ marginBottom: 24, marginTop: 4 }}
          >
            {helpMessage}
          </Text>
        )}

        {bottomElement && <Flex $justify="end">{bottomElement}</Flex>}
      </S.TextFieldContainer>
    );
  },
);

export default TextField;
