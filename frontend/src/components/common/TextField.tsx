import {
  FocusEventHandler,
  forwardRef,
  InputHTMLAttributes,
  useState,
} from 'react';
import Input from '@common/Input/Input';
import Text from '@common/Text';
import Flex from './Flex';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  hasError?: boolean;
  helpMessage?: React.ReactNode;
  rightElement?: React.ReactNode;
  bottomElement?: React.ReactNode;
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
      <div>
        {label ? (
          <Text typography="t12" display="block" style={{ marginBottom: 12 }}>
            {label}
          </Text>
        ) : null}

        <Flex align="center">
          <Input
            autoComplete="off"
            ref={ref}
            aria-invalid={hasError}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />

          {rightElement}
          {/* button 넣기 */}
        </Flex>

        {bottomElement && <Flex justify="end">{bottomElement}</Flex>}

        {helpMessage && (
          <Text
            typography="t10"
            color={labelColor}
            display="inline-block"
            style={{ marginBottom: 6, fontSize: 12 }}
          >
            {helpMessage}
          </Text>
        )}
      </div>
    );
  },
);

export default TextField;
