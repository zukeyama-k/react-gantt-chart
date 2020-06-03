import React, { useState, createContext } from 'react';
import Styled from 'styled-components';
import { isSunday, isToday, isSaturday } from 'date-fns';
import HeadRows from './component/HeadRows';
import Rows from './component/Rows';
import Days from './component/Days';
import Paging from './component/Paging';
import en from  'date-fns/locale/en-US';

import { 
  SHOWMONTH,
  CHARTMARGIN,
  CHART_COLOR,
  DAY_COLOR
 } from './config';
import { getIntervalDate } from './util';
import { HeadRowsDataType, RootProps, DefaultOptionsType } from './type/type';

export const Options = createContext({} as DefaultOptionsType);

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

const defaultOptions: DefaultOptionsType = {
  showMonth: SHOWMONTH,
  locale: en,
  headTitle: '',
  headFormat: 'yyyy/MM',
  currentFormat: 'yyyy/MM/dd',
  getPagingPrevLetter: (month: number) => 'prev',
  getPagingNextLetter: (month: number) => 'next',
  getDayColor: (date: Date) :string => 'none',
  getChartColor: (i: number) :string => 'rgba(0, 0,0 , 0.7)'
};

const ReactGanttChart: React.FC<RootProps> = ({
  data,
  option
}) => {
  const products: HeadRowsDataType[] = data;
  const extendsOptions = { ...defaultOptions, ...option };
  const [[start, end], setPage] = useState([1, extendsOptions.showMonth - 1]);
  const intervalDate: Date[] = getIntervalDate(start, end);
  const intervalManth: { [key: number]: Date } = intervalDate.reduce(
    (
      accumulator: { [key: number]: Date },
      currentValue: Date
    ): { [key: number]: Date } => {
      return {
        ...accumulator,
        [`${currentValue.getFullYear()}${
          currentValue.getMonth() + 1
        }`]: currentValue,
      };
    },
    {}
  );
 
  return (
    <>
      <Options.Provider value={extendsOptions}>
        <Paging set={setPage} value={[start, end]} />
        <GanttChartContainer>
          <GanttChartHeader>
            <HeadRows rows={products} />
          </GanttChartHeader>
          <GanttChartBody>
            <Days days={intervalManth} data={intervalDate} />
            <Rows intervalDate={intervalDate} data={products} />
          </GanttChartBody>
        </GanttChartContainer>
      </Options.Provider>
    </>
  );
};

export default ReactGanttChart;