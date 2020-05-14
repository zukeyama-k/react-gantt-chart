import React, { useState } from 'react';
import Styled from 'styled-components';
import ProductRows from './component/ProductRows';
import Rows from './component/Rows';
import Days from './component/Days';
import Paging from './component/Paging';
import { SHOWMONTH } from './config';
import { getIntervalDate } from './util';
import { ProductsDataType, RootProps } from './type/type';

const GanttChartContainer = Styled.div`
  display: flex;
  width: 100%;
  border: solid 1px #dedede;
  box-sizing: border-box;
`;

const GanttChartHeader = Styled.div`
  width: 280px;
  border-right: solid 1px #c3c3c3; 
  box-sizing: border-box;
`;

const GanttChartBody = Styled.div`
  overflow-x: scroll;
  width: calc(100% - 280px);
  box-sizing: border-box;
`;

interface DefaultOptionsType {
  showMonth: number;
}

const defaultOptions: DefaultOptionsType = {
  showMonth: SHOWMONTH,
};

const ReactGanttChart: React.FC<RootProps> = ({
  data,
  option: { showMonth } = defaultOptions,
}) => {
  const products: ProductsDataType[] = data;
  const [[start, end], setPage] = useState([1, showMonth - 1]);
  const intervalDate: Date[] = getIntervalDate(start, end);
  const intervalManth: { [key: number]: Date } = intervalDate.reduce(
    (
      accumulator: { [key: number]: Date },
      currentValue: Date
    ): { [key: number]: Date } => {
      return {
        ...accumulator,
        [`${currentValue.getFullYear()}年${
          currentValue.getMonth() + 1
        }`]: currentValue,
      };
    },
    {}
  );
  return (
    <>
      <Paging set={setPage} value={[start, end]} />
      <GanttChartContainer>
        <GanttChartHeader>
          <ProductRows rows={products} />
        </GanttChartHeader>
        <GanttChartBody>
          <Days days={intervalManth} data={intervalDate} />
          <Rows intervalDate={intervalDate} data={products} />
        </GanttChartBody>
      </GanttChartContainer>
    </>
  );
};

export default ReactGanttChart;
