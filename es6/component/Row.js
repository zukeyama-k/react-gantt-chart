import React, { useContext } from 'react';
import { FlexRow, Day } from './utilComponents';
import { Options } from '../react-gantt-chart';
const Row = ({ data, isShowDay = true, width, children, id, onClick, }) => {
    const context = useContext(Options);
    const localize = context.options.locale.localize;
    return (React.createElement(FlexRow, { style: {
            width: width,
            position: 'relative',
            overflow: 'hidden',
            height: isShowDay ? '50px' : '40px',
        } },
        React.createElement("div", { onClick: onClick, "data-id": id },
            React.createElement("div", { style: { display: 'flex', height: '100%', alignItems: 'center' } }, data.map((d, i) => {
                const color = context.options.getDayColor(d);
                return (React.createElement(Day, { key: i, style: {
                        height: isShowDay ? '50px' : '40px',
                        background: color,
                    } }, isShowDay && (React.createElement("p", null,
                    d.getDate(),
                    React.createElement("br", null),
                    localize.day(d.getDay(), { width: 'short' })))));
            })),
            children)));
};
export default Row;
