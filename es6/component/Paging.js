import React, { useContext } from 'react';
import Styled from 'styled-components';
import { Options } from '../react-gantt-chart';
const Button = Styled.button `
  margin-right: 10px;
  font-size: 13px;
  border-radius: 5px;
  color: #67ad95;
  font-weight: bold;
`;
const Paging = ({ set, value, children }) => {
    const context = useContext(Options);
    const [start, end] = value;
    const prev = () => {
        set([start - context.options.showMonth, end]);
    };
    const next = () => {
        set([start + context.options.showMonth, end]);
    };
    console.log(value);
    return (React.createElement("div", { style: { display: 'flex', alignItems: 'center', marginBottom: '10px' } },
        React.createElement(Button, { onClick: prev }, context.options.getPagingPrevLetter(context.options.showMonth)),
        children,
        React.createElement(Button, { onClick: next }, context.options.getPagingNextLetter(context.options.showMonth))));
};
export default Paging;
