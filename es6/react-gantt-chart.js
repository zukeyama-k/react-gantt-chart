import React, { useState, createContext, useRef, useEffect, useImperativeHandle, } from 'react';
import Styled from 'styled-components';
import { format as formatDate, addMonths } from 'date-fns';
import HeadRows from './component/HeadRows';
import Rows from './component/Rows';
import Days from './component/Days';
import Paging from './component/Paging';
import { WrapperTooltips } from './component/WrapperTooltips';
import en from 'date-fns/locale/en-US';
import { SHOWMONTH } from './config';
import { getIntervalDate } from './util';
export const Options = createContext({});
const GanttChartContainer = Styled.div `
  display: flex;
  width: 100%;
  border: solid 1px #dedede;
  box-sizing: border-box;
`;
const GanttChartHeader = Styled.div `
  width: 280px;
  border-right: solid 1px #c3c3c3; 
  box-sizing: border-box;
`;
const GanttChartBody = Styled.div `
  overflow-x: scroll;
  width: calc(100% - 280px);
  box-sizing: border-box;
`;
const defaultOptions = {
    showMonth: SHOWMONTH,
    locale: en,
    headTitle: '',
    headFormat: 'yyyy/MM',
    currentFormat: 'yyyy/MM/dd',
    initDate: new Date(),
    getPagingPrevLetter: () => 'prev',
    getPagingNextLetter: () => 'next',
    getDayColor: () => 'none',
    getChartColor: () => 'rgba(0, 0,0 , 0.7)',
    onClick: () => null,
};
const ReactGanttChart = React.forwardRef(({ data, option }, ref) => {
    const tooltipRef = useRef(null);
    const products = data;
    const extendsOptions = { ...defaultOptions, ...option };
    const initDate = [
        extendsOptions.initDate,
        addMonths(extendsOptions.initDate, extendsOptions.showMonth - 1),
    ];
    const [[start, end], setPage] = useState(initDate);
    const context = {
        tooltipRef,
        options: extendsOptions,
    };
    useEffect(() => {
        setPage(initDate);
    }, [data]);
    const intervalDate = getIntervalDate(start, end);
    const intervalManth = intervalDate.reduce((accumulator, currentValue) => {
        return {
            ...accumulator,
            [`${formatDate(currentValue, 'yyyyMM')}`]: currentValue,
        };
    }, {});
    useImperativeHandle(ref, () => ({
        closeTooltip: () => {
            if (tooltipRef && tooltipRef.current) {
                tooltipRef.current.style.display = 'none';
                tooltipRef.current.innerText = '';
            }
        },
    }));
    return (React.createElement(React.Fragment, null,
        React.createElement(Options.Provider, { value: context },
            React.createElement(Paging, { set: setPage, value: [start, end] },
                React.createElement("div", null,
                    "\uFF5C",
                    formatDate(intervalDate[0], context.options.currentFormat),
                    " ~",
                    ' ',
                    formatDate(intervalDate[intervalDate.length - 1], context.options.currentFormat),
                    "\uFF5C")),
            React.createElement(GanttChartContainer, null,
                React.createElement(GanttChartHeader, null,
                    React.createElement(HeadRows, { rows: products })),
                React.createElement(GanttChartBody, null,
                    React.createElement(Days, { days: intervalManth, data: intervalDate }),
                    React.createElement(Rows, { intervalDate: intervalDate, data: products })),
                React.createElement(WrapperTooltips, { ref: tooltipRef })))));
});
export default ReactGanttChart;
