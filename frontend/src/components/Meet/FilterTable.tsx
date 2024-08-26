/** 모임 - 지역 filter  component (지역 prosp로 넘겨주는 중) */
import React from 'react';
import { Table, TableCell, TableRow } from './FilterTable.styled';
import { MeetFilterProps } from '@/models/meet';

const FilterTable = ({ onClick }: MeetFilterProps) => {
  const rows = 4;
  const cols = 4;
  const locationArray = [
    '전체',
    '서울',
    '인천',
    '경기',
    '강원',
    '대전',
    '충남',
    '충북',
    '광주',
    '전남',
    '전북',
    '부산',
    '경남',
    '경북',
    '제주도',
  ];

  const handleCellClick = (row: number, col: number) => {
    const index = row * cols + col;
    const location = locationArray[index] || '';
    if (onClick) {
      onClick(location, row, col);
    }
  };

  return (
    <Table>
      <tbody>
        {Array.from({ length: rows }, (_, rowIndex) => (
          <TableRow key={rowIndex}>
            {Array.from({ length: cols }, (_, cellIndex) => {
              const isTopLeft = rowIndex === 0 && cellIndex === 0;
              const isTopRight = rowIndex === 0 && cellIndex === cols - 1;
              const isBottomLeft = rowIndex === rows - 1 && cellIndex === 0;
              const isBottomRight =
                rowIndex === rows - 1 && cellIndex === cols - 1;

              // 계산된 인덱스
              const index = rowIndex * cols + cellIndex;
              const location = locationArray[index] || '';

              return (
                <TableCell
                  key={cellIndex}
                  isTopLeft={isTopLeft}
                  isTopRight={isTopRight}
                  isBottomLeft={isBottomLeft}
                  isBottomRight={isBottomRight}
                  onClick={() => handleCellClick(rowIndex, cellIndex)}
                >
                  {location}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
};

export default FilterTable;
