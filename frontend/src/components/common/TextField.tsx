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
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    { label, hasError, rightElement, helpMessage, onFocus, onBlur, ...props },
    ref,
  ) {
    const [focused, setFocused] = useState(false);

    // 우선 순위 : 에러 > focus > 기본
    const labelColor = hasError ? 'red' : focused ? 'main' : 'line';

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
          <Text
            typography="tlabel"
            display="block"
            style={{ marginBottom: 12 }}
          >
            {label}
          </Text>
        ) : null}

        <Flex>
          <Input
            autoComplete="off"
            ref={ref}
            aria-invalid={hasError}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />

          {/* button 넣기 */}
        </Flex>

        {helpMessage && (
          <Text
            typography="t7"
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
