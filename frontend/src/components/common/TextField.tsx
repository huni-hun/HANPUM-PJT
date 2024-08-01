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
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    { label, hasError, helpMessage, onFocus, onBlur, ...props },
    ref,
  ) {
    const [focused, setFocused] = useState(false);

    // 우선 순위 : 에러 > focus > 기본
    // TODO: focus 처리
    const labelColor = hasError ? 'red' : focused ? 'green' : 'grey';

    const handleFocus: FocusEventHandler<HTMLInputElement> = (event) => {
      setFocused(true);
      onFocus?.(event);
    };
    const handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
      setFocused(false);
      onBlur?.(event);
    };

    return (
      <Flex justify="space-between">
        <div>
          {label ? (
            <Text
              typography="t7"
              display="inline-block"
              style={{ marginBottom: 6 }}
            >
              {label}
            </Text>
          ) : null}

          <Input
            ref={ref}
            aria-invalid={hasError}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />
        </div>

        {/* {helpMessage && (
          <Text
            typography="t7"
            color={labelColor}
            display="inline-block"
            style={{ marginBottom: 6, fontSize: 12 }}
          >
            {helpMessage}
          </Text>
        )} */}
      </Flex>
    );
  },
);

export default TextField;
