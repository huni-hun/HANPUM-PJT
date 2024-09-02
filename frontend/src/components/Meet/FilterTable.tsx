/** 모임 - 지역 filter  component (지역 prosp로 넘겨주는 중) */
import React from 'react';
import { Table, TableCell, TableRow } from './FilterTable.styled';
import { MeetFilterProps } from '@/models/meet';
import styled from 'styled-components';
import { colors } from '@/styles/colorPalette';
import { locationArray } from '@/constants';

const FilterTable = ({ onClick }: MeetFilterProps) => {
  return (
    <FilterTableContainer>
      {locationArray.map((location) => (
        <div className="location-item">{location}</div>
      ))}
    </FilterTableContainer>
  );
};

export default FilterTable;

const FilterTableContainer = styled.div`
  width: 100%;
  height: 17.1rem;
  border-radius: 12px;
  border: 1px solid ${colors.grey3};
  box-sizing: border-box;
  margin: 29px 0 24px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  overflow: hidden;

  .location-item {
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid ${colors.grey3};
    border-right: 1px solid ${colors.grey3};
    box-sizing: border-box;
    &:nth-child(4),
    &:nth-child(8),
    &:nth-child(12) {
      border-right: none;
    }

    &:nth-child(13),
    &:nth-child(14),
    &:nth-child(15),
    &:nth-child(16) {
      border-bottom: none;
    }
  }
`;
