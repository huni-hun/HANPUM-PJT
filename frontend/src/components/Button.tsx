import * as B from "./Button.styled";

interface ButtonProps {
  width: number;
  height: number;
  fontColor: string;
  backgroundColor: string;
  radius: number;
  fontSize: number;
  children: string;
  onClick: () => {};
}

function Button({ ...props }: ButtonProps) {
  return (
    <B.ButtonBox {...props} onClick={props.onClick}>
      {props.children}
    </B.ButtonBox>
  );
}

export default Button;
