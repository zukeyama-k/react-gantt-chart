import React, { useContext } from 'react';
import { addMonths, subMonths } from 'date-fns';
import Styled from 'styled-components';

import { Options } from '../react-gantt-chart';

interface PagingType {
  set: (state: [Date, Date]) => void;
  value: [Date, Date];
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
  children
}) => {
  const context = useContext(Options);
  const [start, end] = value;


  const prev = (): void => {
    const sub = context.options.showMonth - 1;
    set([subMonths(start, sub), subMonths(end, sub)]);
  };
  const next = (): void => {
    const add = context.options.showMonth + 1;
    set([addMonths(start, add), addMonths(end, add)]);
  };
  return (
    <div
      style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}
    >
      <Button onClick={prev}>
        {context.options.getPagingPrevLetter(context.options.showMonth)}
      </Button>
      {children}
      <Button onClick={next}>
        {context.options.getPagingNextLetter(context.options.showMonth)}
      </Button>
    </div>
  );
};

export default Paging;
