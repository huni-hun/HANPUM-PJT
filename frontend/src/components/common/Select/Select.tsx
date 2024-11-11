import * as S from './Select.styled';

interface SelectProps {
  list: string[];
  width: number;
  height: number;
  radius: number;
  border: string;
  fontSize: number;
  fontColor: string;
  isOpen: boolean;
  padding: number;
  setOpen: React.MouseEventHandler<HTMLDivElement>;
  onClick: React.MouseEventHandler<HTMLLIElement>;
}

function Select(props: SelectProps) {
  return (
    <S.SelectBox
      width={props.width}
      height={props.height}
      radius={props.radius}
      border={props.border}
      fontSize={props.fontSize}
      fontColor={props.fontColor}
      padding={props.padding}
      onClick={props.setOpen}
    >
      <S.SelectLabel fontSize={props.fontSize} fontColor={props.fontColor}>
        test
      </S.SelectLabel>
      <S.SelectList
        height={props.height}
        isOpen={props.isOpen}
        radius={props.radius}
        border={props.border}
      >
        {props.list.map((ele, index) => (
          <S.SelectItem onClick={props.onClick} value={index}>
            {ele}
          </S.SelectItem>
        ))}
      </S.SelectList>
    </S.SelectBox>
  );
}

export default Select;
