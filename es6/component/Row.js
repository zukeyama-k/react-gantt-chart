import React, { useContext } from 'react';
import { getDayColor } from '../util';
import { FlexRow, Day } from './utilComponents';
import { Options } from '../react-gantt-chart';
const Row = ({ data, isShowDay = true, width, children, }) => {
    const o = useContext(Options);
    return (React.createElement(FlexRow, { style: {
            width: width,
            position: 'relative',
            overflow: 'hidden',
            height: isShowDay ? '50px' : '40px',
        } },
        React.createElement("div", { style: { display: 'flex', height: '100%', alignItems: 'center' } }, data.map((d, i) => {
            const color = getDayColor(d, o.isHoliday, o.DAY_COLOR);
            return (React.createElement(Day, { key: i, style: { height: isShowDay ? '50px' : '40px', background: color } }, isShowDay && (React.createElement("p", null,
                d.getDate(),
                React.createElement("br", null),
                o.WEEK_JA[d.getDay()]))));
        })),
        children));
};
export default Row;
