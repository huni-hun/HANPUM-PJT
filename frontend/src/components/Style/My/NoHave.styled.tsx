import styled from 'styled-components';

interface StyleProps {
  marginTop?: string;
}
export const NoHaveContainer = styled.div<StyleProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: ${(props) => props.marginTop || '144px'};
  img {
    margin-bottom: 20px;
  }
`;
