import React, { useContext } from 'react';
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
  value,
  children
}) => {
  const context = useContext(Options);
  const [start, end] = value;
  const prev = (): void => {
    set([start - context.options.showMonth, end]);
  };
  const next = (): void => {
    set([start + context.options.showMonth, end]);
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
