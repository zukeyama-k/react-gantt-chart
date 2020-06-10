import React, { useState, createContext, forwardRef, useRef } from 'react';
import Styled from 'styled-components';
import { format as formatDate } from 'date-fns';
import HeadRows from './component/HeadRows';
import Rows from './component/Rows';
import Days from './component/Days';
import Paging from './component/Paging';
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
    getPagingPrevLetter: (month) => 'prev',
    getPagingNextLetter: (month) => 'next',
    getDayColor: (date) => 'none',
    getChartColor: (i) => 'rgba(0, 0,0 , 0.7)'
};
const Tooltips = (props, ref) => {
    return (React.createElement("div", { ref: ref, style: {
            width: '350px',
            position: 'fixed',
            padding: '3px 5px',
            fontSize: '12px',
            height: 'auto',
            borderRadius: '3px',
            boxSizing: 'border-box',
            backgroundColor: '#fff',
            boxShadow: "-3px 6px 19px -4px rgba(0, 0, 0, 0.54)"
        } }));
};
const WrapperTooltips = forwardRef(Tooltips);
const ReactGanttChart = ({ data, option }) => {
    const tooltipRef = useRef(null);
    const products = data;
    const extendsOptions = Object.assign(Object.assign({}, defaultOptions), option);
    const [[start, end], setPage] = useState([1, extendsOptions.showMonth - 1]);
    const context = {
        tooltipRef,
        options: extendsOptions
    };
    const intervalDate = getIntervalDate(start, end);
    const intervalManth = intervalDate.reduce((accumulator, currentValue) => {
        return Object.assign(Object.assign({}, accumulator), { [`${formatDate(currentValue, 'yyyyMM')}`]: currentValue });
    }, {});
    return (React.createElement(React.Fragment, null,
        React.createElement(Options.Provider, { value: context },
            React.createElement(Paging, { set: setPage, value: [start, end] },
                React.createElement("div", null,
                    "\uFF5C",
                    formatDate(intervalDate[0], context.options.currentFormat),
                    " ~ ",
                    formatDate(intervalDate[intervalDate.length - 1], context.options.currentFormat),
                    "\uFF5C")),
            React.createElement(GanttChartContainer, null,
                React.createElement(GanttChartHeader, null,
                    React.createElement(HeadRows, { rows: products })),
                React.createElement(GanttChartBody, null,
                    React.createElement(Days, { days: intervalManth, data: intervalDate }),
                    React.createElement(Rows, { intervalDate: intervalDate, data: products })),
                React.createElement(WrapperTooltips, { ref: tooltipRef })))));
};
export default ReactGanttChart;
