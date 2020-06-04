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
    const option = useContext(Options);
    const [start, end] = value;
    const prev = () => {
        set([start - option.showMonth, end]);
    };
    const next = () => {
        set([start + option.showMonth, end]);
    };
    return (React.createElement("div", { style: { display: 'flex', alignItems: 'center', marginBottom: '10px' } },
        React.createElement(Button, { onClick: prev }, option.getPagingPrevLetter(option.showMonth)),
        React.createElement("div", null,
            "\uFF5C",
            formatDate(new Date(), option.currentFormat),
            "\uFF5C"),
        React.createElement(Button, { onClick: next }, option.getPagingNextLetter(option.showMonth))));
};
export default Paging;
