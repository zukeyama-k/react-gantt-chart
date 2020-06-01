import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ReactGanttChart from './react-gantt-chart';
import JapaneseHolidays from 'japanese-holidays';
import { HeadRowsDataType } from './type/type';

const products: HeadRowsDataType[] = [
  {
    name: 'test',
    data: [
      { start: new Date(2020, 3, 29), end: new Date(2020, 4, 30) },
      { start: new Date(2020, 4, 31), end: new Date(2020, 5, 12) },
      { start: new Date(2020, 6, 3), end: new Date(2020, 8, 30) },
    ],
  },
  {
    name: 'test',
    data: [
      { start: new Date(2020, 3, 29), end: new Date(2020, 4, 30) },
      { start: new Date(2020, 4, 31), end: new Date(2020, 5, 12) },
      { start: new Date(2020, 6, 3), end: new Date(2020, 8, 30) },
    ],
  },
  {
    name: 'test',
    data: [
      { start: new Date(2020, 3, 29), end: new Date(2020, 4, 30) },
      { start: new Date(2020, 4, 31), end: new Date(2020, 5, 12) },
      { start: new Date(2020, 6, 3), end: new Date(2020, 8, 30) },
    ],
  },
  {
    name: 'test',
    data: [
      { start: new Date(2020, 3, 29), end: new Date(2020, 4, 30) },
      { start: new Date(2020, 4, 31), end: new Date(2020, 5, 12) },
      { start: new Date(2020, 6, 3), end: new Date(2020, 8, 30) },
    ],
  },
];

const option = {
  showMonth: 4,
  isHoliday: (date:Date) :string | undefined => {
    return JapaneseHolidays.isHoliday(date)
  },
  yearLetter: '年',
  monthLetter: '月',
  pagingPrevLetter: 'ヵ月前',
  pagingNextLetter: 'ヵ月後'  
};

ReactDOM.render(
  <ReactGanttChart data={products} option={option} />,
  document.getElementById('root')
);
