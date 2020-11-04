import React, { useContext } from 'react';
import { differenceInCalendarDays } from 'date-fns';
import { CELLWIDTH, CHARTMARGIN } from '../config';
import Row from './Row';
import { Options } from '../react-gantt-chart';
import { Schedule } from './Schedule';
const pointerMargin = 20;
const Rows = ({ intervalDate, data }) => {
    const [firstDay] = intervalDate;
    const context = useContext(Options);
    const onShowTooltips = (e) => {
        /***
         * render最適化できずに重くなるため仕方なくDOM操作 TODOとしてTooltipのみのrenderが走るようにする
         ***/
        if (e.target.className === 'chart' && e.target.dataset.remark) {
            const tooltipRefClientRect = context.tooltipRef.current.getBoundingClientRect();
            const isMaxWindow = window.innerWidth - e.clientX > tooltipRefClientRect.width;
            context.tooltipRef.current.style.left =
                e.clientX +
                    (isMaxWindow
                        ? pointerMargin
                        : -(tooltipRefClientRect.width + pointerMargin)) +
                    'px';
            context.tooltipRef.current.style.top = e.clientY - pointerMargin + 'px';
            context.tooltipRef.current.innerText = e.target.dataset.remark;
            context.tooltipRef.current.style.display = 'block';
        }
        else {
            context.tooltipRef.current.style.display = 'none';
            context.tooltipRef.current.innerText = null;
        }
    };
    return (React.createElement(React.Fragment, null, data.map((productsData, i) => {
        return (React.createElement("div", { key: i, onMouseMove: onShowTooltips },
            React.createElement(Row, { key: i, id: productsData.id, data: intervalDate, isShowDay: false, width: `${intervalDate.length * CELLWIDTH}px`, onClick: context.options.onClick }, productsData.data.map((sale, i) => {
                const startDay = differenceInCalendarDays(sale.start, firstDay);
                const endDay = differenceInCalendarDays(sale.end, sale.start);
                return (React.createElement(Schedule, { key: i, width: `${endDay * CELLWIDTH}px`, left: `${startDay * CELLWIDTH + CHARTMARGIN}px`, remark: sale.remark || '', customStyle: sale.customStyle || {}, dataId: sale.id }));
            }))));
    })));
};
export default Rows;
