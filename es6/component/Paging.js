import React, { useContext } from 'react';
import { format as formatDate } from 'date-fns';
import Styled from 'styled-components';
import { Options } from '../react-gantt-chart';
const Button = Styled.button `
  margin-right: 10px;
  font-size: 13px;
  border-radius: 5px;
  color: #67ad95;
  font-weight: bold;
`;
const Paging = ({ set, value }) => {
    const o = useContext(Options);
    const [start, end] = value;
    const prev = () => {
        set([start - o.showMonth, end]);
    };
    const next = () => {
        set([start + o.showMonth, end]);
    };
    return (React.createElement("div", { style: { display: 'flex', alignItems: 'center', marginBottom: '10px' } },
        React.createElement(Button, { onClick: prev },
            o.showMonth,
            o.pagingPrevLetter),
        React.createElement("div", null,
            "\uFF5C",
            formatDate(new Date(), 'yyyy年MM月dd日'),
            "\uFF5C"),
        React.createElement(Button, { onClick: next },
            o.showMonth,
            o.pagingNextLetter)));
};
export default Paging;
