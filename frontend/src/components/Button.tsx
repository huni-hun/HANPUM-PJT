import * as B from "./Button.styled";

interface ButtonProps {
  width: number;
  height: number;
  fontColor: string;
  backgroundColor: string;
  radius: number;
  fontSize: number;
  children: string;
}

function Button({ ...props }: ButtonProps) {
  return <B.ButtonBox {...props}>{props.children}</B.ButtonBox>;
}

export default Button;
