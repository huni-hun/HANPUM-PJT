import { CSSProperties, ComponentProps, ReactNode } from "react";
import * as S from "./Input.styled";

interface InputProps extends Omit<ComponentProps<"input">, "style" | "size"> {
  size?: "md" | "sm";
  placeholder?: string;
  rightSlot?: ReactNode; // input 옆에 아이콘 같은 거
  error?: boolean; // 유효성
  errorMessage?: string;
  width: string | number;
  style?: CSSProperties;
}

const Input = ({
  placeholder,
  rightSlot,
  size = "md",
  error,
  errorMessage,
  width,
  style,
  ...rest
}: InputProps) => {
  console.log(size);
  return (
    <>
      <S.InputWrapper className="input-wrapper" style={style}>
        <S.Input
          placeholder={placeholder}
          {...rest}
          autoComplete="off"
          width={width}
          size={size}
        />
        {rightSlot}
      </S.InputWrapper>

      {error && <span>{errorMessage}</span>}
    </>
  );
};

export default Input;
