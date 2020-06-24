import React, { useContext } from 'react';
import { Head, FlexRow } from './utilComponents';
import { Options } from '../react-gantt-chart';
const HeadRows = ({ rows }) => {
    const context = useContext(Options);
    return (React.createElement(React.Fragment, null,
        React.createElement(Head, null, "\u00A0"),
        React.createElement(FlexRow, { style: {
                padding: '5px 15px',
                fontWeight: 'bold',
                fontSize: '13px',
                height: '50px',
            } }, context.options.headTitle),
        rows.map((row, i) => {
            return (React.createElement(FlexRow, { index: i + 1, key: i, style: { padding: '5px 15px', fontSize: '20px', color: '#67ad95' } },
                React.createElement("div", { className: "head-row-title", style: { overflowX: 'scroll' } }, row.href ? (React.createElement("a", { href: row.href, style: { whiteSpace: 'nowrap' }, className: row.customClass }, row.name)) : (React.createElement("p", { style: { whiteSpace: 'nowrap' }, className: row.customClass }, row.name)))));
        })));
};
export default HeadRows;
