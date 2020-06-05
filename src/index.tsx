import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ReactGanttChart from './react-gantt-chart';
import JapaneseHolidays from 'japanese-holidays';
import { HeadRowsDataType } from './type/type';
import ja from  'date-fns/locale/ja';
import { isSunday, isToday, isSaturday } from 'date-fns';
import { 
  CHART_COLOR,
  DAY_COLOR
 } from './config';
const products: HeadRowsDataType[] = [
  {
    name: 'test1',
    data: [
      { start: new Date(2020, 3, 29), end: new Date(2020, 4, 30), remark: 'テステス' },
      { start: new Date(2020, 4, 31), end: new Date(2020, 5, 12), remark: 'テステス28888888888' },
      { start: new Date(2020, 6, 3), end: new Date(2020, 8, 30), remark: 'テステス4' },
    ],
  },
  {
    name: 'test2',
    data: [
      { start: new Date(2020, 3, 29), end: new Date(2020, 4, 30), remark: 'テregrステス4' },
      { start: new Date(2020, 4, 31), end: new Date(2020, 5, 12), remark: 'チャート上の期間の表示が短いと切れてしまうので、削除してしまって hover で表示させたいです。' },
      { start: new Date(2020, 6, 3), end: new Date(2020, 8, 30) },
    ],
  },
  {
    name: 'test3',
    data: [
      { start: new Date(2020, 3, 29), end: new Date(2020, 4, 30), remark: 'fffff' },
      { start: new Date(2020, 4, 31), end: new Date(2020, 5, 12) },
      { start: new Date(2020, 6, 3), end: new Date(2020, 8, 30) },
    ],
  },
  {
    name: 'test4',
    data: [
      { start: new Date(2020, 3, 29), end: new Date(2020, 4, 30) },
      { start: new Date(2020, 4, 31), end: new Date(2020, 5, 12) },
      { start: new Date(2020, 6, 3), end: new Date(2020, 8, 30) },
    ],
  },
];

const option = {
  showMonth: 4,
  locale: ja,
  headFormat: 'yyyy年MM月',
  currentFormat: 'yyyy月MM月dd日',
  getDayColor: (date: Date) :string => {
    if (isToday(date)) return DAY_COLOR.TODAY;
    if (isSunday(date) || JapaneseHolidays.isHoliday(date))
      return DAY_COLOR.HOLIDAY;
    if (isSaturday(date)) return DAY_COLOR.SATURDAY;
    return 'none';
  },
  getChartColor: (i: number) :string => {
    const num: number = i % Object.keys(CHART_COLOR).length;
    switch (num) {
      case 0:
        return CHART_COLOR.PINK;
        break;
      case 1:
        return CHART_COLOR.BLUE;
        break;
      case 2:
        return CHART_COLOR.GREEN;
        break;
      default:
        return CHART_COLOR.PINK;
    }
    return 'none';
  },
  getPagingPrevLetter: (month: number) => `${month}ヵ月前`,
  getPagingNextLetter: (month: number) => `${month}ヵ月後`
};

ReactDOM.render(
  <ReactGanttChart data={products} option={option} />,
  document.getElementById('root')
);
