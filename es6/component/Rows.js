import React, { useContext } from 'react';
import { differenceInCalendarDays } from 'date-fns';
import { CELLWIDTH, CHARTMARGIN } from '../config';
import Row from './Row';
import { Options } from '../react-gantt-chart';
const Schedule = ({ width, left, backgroundColor, remark = '' }) => {
    return (React.createElement("div", { className: "chart", "data-remark": remark, style: { position: 'absolute', top: '5px', left, width, height: '30px', borderRadius: '5px', backgroundColor, opacity: '0.7', boxSizing: 'border-box' } }));
};
const Rows = ({ intervalDate, data }) => {
    const [firstDay] = intervalDate;
    const context = useContext(Options);
    const onShowTooltips = (e) => {
        if (e.target.className === 'chart' && e.target.dataset.remark) {
            context.tooltipRef.current.style.display = 'block';
            context.tooltipRef.current.style.left = (e.clientX + 20) + 'px';
            context.tooltipRef.current.style.top = (e.clientY - 20) + 'px';
            context.tooltipRef.current.textContent = e.target.dataset.remark;
        }
        else {
            context.tooltipRef.current.style.display = 'none';
            context.tooltipRef.current.textContent = null;
        }
    };
    return (React.createElement(React.Fragment, null, data.map((productsData, i) => {
        return (React.createElement("div", { key: i, onMouseMove: onShowTooltips },
            React.createElement(Row, { key: i, data: intervalDate, isShowDay: false, width: `${intervalDate.length * CELLWIDTH}px` }, productsData.data.map((sale, i) => {
                const startDay = differenceInCalendarDays(sale.start, firstDay);
                const endDay = differenceInCalendarDays(sale.end, sale.start);
                const remark = sale.remark || '';
                return (React.createElement(Schedule, { key: i, width: `${endDay * CELLWIDTH}px`, left: `${startDay * CELLWIDTH + CHARTMARGIN}px`, backgroundColor: context.options.getChartColor(i), remark: remark }));
            }))));
    })));
};
export default Rows;
