import React, { useContext } from 'react';
import { endOfMonth, format } from 'date-fns';
import { CELLWIDTH } from '../config';
import { Head } from './utilComponents';
import Row from './Row';
import { Options } from '../react-gantt-chart';
const Days = ({ days, data }) => {
    const context = useContext(Options);
    return (React.createElement("div", { style: { display: 'flex' } },
        React.createElement("div", { style: { flex: '1 1 auto' } },
            React.createElement("div", { style: { display: 'flex' } }, Object.entries(days).map(([monthNum, month], i) => {
                const width = endOfMonth(month).getDate() * CELLWIDTH;
                return (React.createElement(Head, { key: i, style: {
                        textAlign: 'center',
                        borderRight: 'solid 1px #dedede',
                        width,
                    } }, format(month, context.options.headFormat, { locale: context.options.locale })));
            })),
            React.createElement(Row, { data: data, width: `${data.length * CELLWIDTH}px` }))));
};
export default Days;
