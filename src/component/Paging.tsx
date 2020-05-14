import * as React from 'react';
import { format as formatDate } from 'date-fns';
import Styled from 'styled-components';
import { PAGING } from '../config';

interface PagingType {
  prevText?: string;
  nextText?: string;
  set: (state: [number, number]) => void;
  value: [number, number];
}

const Button = Styled.button`
  margin-right: 10px;
  font-size: 13px;
  border-radius: 5px;
  color: #67ad95;
  font-weight: bold;
`;

const Paging: React.FC<PagingType> = ({
  set,
  value,
  prevText = 'ヶ月前へ',
  nextText = 'ヶ月後へ',
}) => {
  const [start, end] = value;
  const prev = (): void => {
    set([start - PAGING, end]);
  };
  const next = (): void => {
    set([start + PAGING, end]);
  };
  return (
    <div
      style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}
    >
      <Button onClick={prev}>
        {PAGING}
        {prevText}
      </Button>
      <div>｜{formatDate(new Date(), 'yyyy年MM月dd日')}｜</div>
      <Button onClick={next}>
        {PAGING}
        {nextText}
      </Button>
    </div>
  );
};

export default Paging;
