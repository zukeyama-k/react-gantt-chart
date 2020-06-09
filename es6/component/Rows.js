import React, { useContext } from 'react';
import { differenceInCalendarDays } from 'date-fns';
import { CELLWIDTH, CHARTMARGIN } from '../config';
import Row from './Row';
import { Options } from '../react-gantt-chart';
const pointerMargin = 20;
const Schedule = ({ width, left, remark = '', customStyle = {} }) => {
    const style = { position: 'absolute', top: '5px', left, width, height: '30px', backgroundColor: '#000', borderRadius: '5px', opacity: '0.7', boxSizing: 'border-box' };
    return (React.createElement("div", { className: 'chart', "data-remark": remark, style: Object.assign(Object.assign({}, style), customStyle) }));
};
const Rows = ({ intervalDate, data }) => {
    const [firstDay] = intervalDate;
    const context = useContext(Options);
    const onShowTooltips = (e) => {
        /***
        * render最適化できずに重くなるため仕方なくDOM操作 TODOとしてTooltipのみのrenderが走るようにする
        ***/
        if (e.target.className === 'chart' && e.target.dataset.remark) {
            const tooltipRefClientRect = context.tooltipRef.current.getBoundingClientRect();
            const isMaxWindow = (window.innerWidth - e.clientX) > tooltipRefClientRect.width;
            context.tooltipRef.current.style.left = (e.clientX + (isMaxWindow ? pointerMargin : -(tooltipRefClientRect.width + pointerMargin))) + 'px';
            context.tooltipRef.current.style.top = (e.clientY - pointerMargin) + 'px';
            context.tooltipRef.current.textContent = e.target.dataset.remark;
            context.tooltipRef.current.style.display = 'block';
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
                const customStyle = sale.customStyle || {};
                return (React.createElement(Schedule, { key: i, width: `${endDay * CELLWIDTH}px`, left: `${startDay * CELLWIDTH + CHARTMARGIN}px`, remark: remark, customStyle: customStyle }));
            }))));
    })));
};
export default Rows;
