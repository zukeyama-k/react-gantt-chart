import React, { useState, createContext, forwardRef, useRef, useEffect } from 'react';
import Styled from 'styled-components';
import { format as formatDate, isSunday, isToday, isSaturday, addMonths } from 'date-fns';
import HeadRows from './component/HeadRows';
import Rows from './component/Rows';
import Days from './component/Days';
import Paging from './component/Paging';
import en from  'date-fns/locale/en-US';

import { 
  SHOWMONTH
 } from './config';
import { getIntervalDate } from './util';
import { HeadRowsDataType, RootProps, DefaultOptionsType, Context } from './type/type';

export const Options = createContext({} as Context);

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
  initDate: new Date(),
  getPagingPrevLetter: (month: number) => 'prev',
  getPagingNextLetter: (month: number) => 'next',
  getDayColor: (date: Date) :string => 'none',
  getChartColor: (i: number) :string => 'rgba(0, 0,0 , 0.7)'
};

interface Coordinate {
  coordinate: {
    point: { x: number, y: number };
  }
}

const Tooltips: React.ForwardRefRenderFunction<HTMLDivElement, {}> = (props, ref) => {
  return (
    <div ref={ref} style={{
      width: '350px',
      position: 'fixed',
      padding: '3px 5px',
      fontSize: '12px',
      height: 'auto',
      borderRadius: '3px',
      boxSizing: 'border-box',
      backgroundColor: '#fff',
      boxShadow: "-3px 6px 19px -4px rgba(0, 0, 0, 0.54)" }}
    >
    </div>
  )
}

const WrapperTooltips = forwardRef(Tooltips);

const ReactGanttChart: React.FC<RootProps> = ({
  data,
  option
}) => {
  const tooltipRef = useRef(null);
  const products: HeadRowsDataType[] = data;
  const extendsOptions:DefaultOptionsType = { ...defaultOptions, ...option }; 
  const [[start, end], setPage] = useState([extendsOptions.initDate, addMonths(extendsOptions.initDate, extendsOptions.showMonth - 1)]);
  const context: Context = {
    tooltipRef,
    options: extendsOptions
  };
  useEffect(() => {
      setPage([extendsOptions.initDate, addMonths(extendsOptions.initDate, extendsOptions.showMonth - 1)]);
  }, [data]);  
  const intervalDate: Date[] = getIntervalDate(start, end);
  const intervalManth: { [key: number]: Date } = intervalDate.reduce(
    (
      accumulator: { [key: number]: Date },
      currentValue: Date
    ): { [key: number]: Date } => {
      return {
        ...accumulator,
        [`${formatDate(currentValue, 'yyyyMM')}`]: currentValue,
      };
    },
    {}
  );
  return (
    <>
      <Options.Provider value={context}>
        <Paging set={setPage} value={[start, end]}>
         <div>｜{formatDate(intervalDate[0], context.options.currentFormat)} ~ {formatDate(intervalDate[intervalDate.length - 1], context.options.currentFormat)}｜</div>
        </Paging>
        <GanttChartContainer>
          <GanttChartHeader>
            <HeadRows rows={products} />
          </GanttChartHeader>
          <GanttChartBody>
            <Days days={intervalManth} data={intervalDate} />
            <Rows intervalDate={intervalDate} data={products} />
          </GanttChartBody>
          <WrapperTooltips ref={tooltipRef} />     
        </GanttChartContainer>
      </Options.Provider>
    </>
  );
};

export default ReactGanttChart;
