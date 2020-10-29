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

const Paging: React.FC<PagingType> = ({ set, value, children }) => {
  const context = useContext(Options);
  const [start, end] = value;

  const prev = (): void => {
    set([
      subMonths(start, context.options.showMonth),
      subMonths(end, context.options.showMonth),
    ]);
  };
  const next = (): void => {
    set([
      addMonths(start, context.options.showMonth),
      addMonths(end, context.options.showMonth),
    ]);
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
