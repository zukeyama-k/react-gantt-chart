import React, { useContext } from 'react';
import { format as formatDate } from 'date-fns';
import Styled from 'styled-components';

import { Options } from '../react-gantt-chart';

interface PagingType {
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
  value
}) => {
  const o = useContext(Options);
  const [start, end] = value;
  const prev = (): void => {
    set([start - o.showMonth, end]);
  };
  const next = (): void => {
    set([start + o.showMonth, end]);
  };
  return (
    <div
      style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}
    >
      <Button onClick={prev}>
        {o.showMonth}
        {o.pagingPrevLetter}
      </Button>
      <div>｜{formatDate(new Date(), 'yyyy年MM月dd日')}｜</div>
      <Button onClick={next}>
        {o.showMonth}
        {o.pagingNextLetter}
      </Button>
    </div>
  );
};

export default Paging;
