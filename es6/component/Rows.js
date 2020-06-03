import React, { useContext } from 'react';
import { format as formatDate, differenceInCalendarDays } from 'date-fns';
import { CELLWIDTH, CHARTMARGIN } from '../config';
import { getChartColor } from '../util';
import { Schedule } from './utilComponents';
import Row from './Row';
import { Options } from '../react-gantt-chart';
const Rows = ({ intervalDate, data }) => {
    const [firstDay] = intervalDate;
    const o = useContext(Options);
    return (React.createElement(React.Fragment, null, data.map((productsData, i) => {
        return (React.createElement(Row, { key: i, data: intervalDate, isShowDay: false, width: `${intervalDate.length * CELLWIDTH}px` }, productsData.data.map((sale, i) => {
            const startDay = differenceInCalendarDays(sale.start, firstDay);
            const endDay = differenceInCalendarDays(sale.end, sale.start);
            return (React.createElement(Schedule, { key: i, width: `${endDay * CELLWIDTH}px`, left: `${startDay * CELLWIDTH + CHARTMARGIN}px`, backgroundColor: getChartColor(i, o.CHART_COLOR) },
                React.createElement("span", { style: {
                        padding: '3px 10px',
                        display: 'block',
                        color: '#000',
                    } }, `${formatDate(sale.start, 'yyyy/MM/dd')}〜${formatDate(sale.end, 'yyyy/MM/dd')}`)));
        })));
    })));
};
export default Rows;
