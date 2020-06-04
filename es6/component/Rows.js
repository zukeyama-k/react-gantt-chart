import React, { useContext } from 'react';
import { differenceInCalendarDays } from 'date-fns';
import { CELLWIDTH, CHARTMARGIN } from '../config';
import Row from './Row';
import { Options } from '../react-gantt-chart';
const Schedule = ({ width, left, backgroundColor, remark = '' }) => {
    const context = useContext(Options);
    var useTooltips = context.state.useTooltips;
    const onShowTooltips = (e) => {
        useTooltips.set({ remark, point: { x: e.clientX, y: e.clientY } });
    };
    const onHideTooltips = () => {
        useTooltips.set({ remark: '', point: { x: null, y: null } });
    };
    return (React.createElement("div", { className: "tooltips", onMouseEnter: onShowTooltips, onMouseLeave: onHideTooltips, style: { position: 'absolute', top: '5px', left, width, height: '30px', borderRadius: '5px', backgroundColor, opacity: '0.7', boxSizing: 'border-box' } }));
};
const Rows = ({ intervalDate, data }) => {
    const [firstDay] = intervalDate;
    const context = useContext(Options);
    return (React.createElement(React.Fragment, null, data.map((productsData, i) => {
        return (React.createElement(Row, { key: i, data: intervalDate, isShowDay: false, width: `${intervalDate.length * CELLWIDTH}px` }, productsData.data.map((sale, i) => {
            const startDay = differenceInCalendarDays(sale.start, firstDay);
            const endDay = differenceInCalendarDays(sale.end, sale.start);
            const remark = sale.remark || '';
            return (React.createElement(Schedule, { key: i, width: `${endDay * CELLWIDTH}px`, left: `${startDay * CELLWIDTH + CHARTMARGIN}px`, backgroundColor: context.options.getChartColor(i), remark: remark }));
        })));
    })));
};
export default Rows;
