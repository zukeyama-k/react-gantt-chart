import React, { useContext } from 'react';
import { Head, FlexRow } from './utilComponents';
import { Options } from '../react-gantt-chart';
const HeadRows = ({ rows }) => {
    const o = useContext(Options);
    return (React.createElement(React.Fragment, null,
        React.createElement(Head, null, "\u00A0"),
        React.createElement(FlexRow, { style: {
                padding: '5px 15px',
                fontWeight: 'bold',
                fontSize: '13px',
                height: '50px',
            } }, o.HeadTitle),
        rows.map((row, i) => (React.createElement(FlexRow, { index: i + 1, key: i, style: { padding: '5px 15px', fontSize: '20px', color: '#67ad95' } }, row.name)))));
};
export default HeadRows;
