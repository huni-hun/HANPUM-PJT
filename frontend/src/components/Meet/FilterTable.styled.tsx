import styled from 'styled-components';

export const Table = styled.table`
  width: 100%;
  border-collapse: separate; /* 셀 간 테두리 겹침 방지 */
  border-spacing: 0; /* 셀 간격 제거 */
  height: 100vw;
`;

export const TableCell = styled.td<{
  isTopLeft?: boolean;
  isTopRight?: boolean;
  isBottomLeft?: boolean;
  isBottomRight?: boolean;
  isActive?: boolean;
}>`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
  font-size: 1.5rem;
  vertical-align: middle;
  cursor: pointer;

  /* 첫 번째 열의 첫 번째 셀 */
  ${({ isTopLeft }) =>
    isTopLeft &&
    `
    border-top-left-radius: 1.2rem;
  `}

  /* 첫 번째 열의 마지막 셀 */
  ${({ isBottomLeft }) =>
    isBottomLeft &&
    `
    border-bottom-left-radius: 1.2rem;
  `}

  /* 마지막 열의 첫 번째 셀 */
  ${({ isTopRight }) =>
    isTopRight &&
    `
    border-top-right-radius:  1.2rem;
  `}

  /* 마지막 열의 마지막 셀 */
  ${({ isBottomRight }) =>
    isBottomRight &&
    `
    border-bottom-right-radius:  1.2rem;
  `}

${({ isActive }) =>
    isActive &&
    `
    background-color: #ccc;
  `}
`;

export const TableRow = styled.tr``;
