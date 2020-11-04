import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ReactGanttChart from './react-gantt-chart';
import JapaneseHolidays from 'japanese-holidays';
import { Data } from './type/type';
import ja from 'date-fns/locale/ja';
import { isSunday, isToday, isSaturday } from 'date-fns';
import { CHART_COLOR, DAY_COLOR } from './config';

interface DataWidthCssProperties extends Data {
  customStyle?: React.CSSProperties;
}

interface HeadRowsDataStyleType {
  name?: string;
  href?: string;
  customClass?: string;
  id?: string | number;
  data: DataWidthCssProperties[];
}

const products: HeadRowsDataStyleType[] = [
  {
    name: 'テストテストテストテストテストテストテストテストテストテスト',
    href: 'http://localhost:3000/companies/nLOeLwtbrqHxrdY7KOMJ/products',
    customClass: 'mmmm',
    id: 1,
    data: [
      {
        id: 1,
        start: new Date(2020, 3, 29),
        end: new Date(2020, 4, 30),
        remark: 'テステス',
        customStyle: { backgroundColor: 'pink' },
      },
      {
        id: 2,
        start: new Date(2020, 5, 31),
        end: new Date(2020, 6, 25),
        remark: 'テス\nテス\n2888\n88888\n88テステス288\n8888\n\n\n888',
      },
      {
        id: 3,
        start: new Date(2020, 6, 3),
        end: new Date(2020, 8, 30),
        remark: 'テステス4',
      },
    ],
  },
  {
    name: 'test2',
    id: 2,
    data: [
      {
        id: 4,
        start: new Date(2020, 3, 29),
        end: new Date(2020, 4, 30),
        remark: 'テregrステス4',
      },
      {
        id: 5,
        start: new Date(2020, 4, 31),
        end: new Date(2020, 5, 12),
        remark:
          'チャート上の期間の表示が短いと切れてしまうので、削除してしまって hover で表示させたいです。',
      },
      { id: 6, start: new Date(2020, 6, 3), end: new Date(2020, 8, 30) },
    ],
  },
  {
    name: 'test3',
    id: 3,
    data: [
      {
        id: 7,
        start: new Date(2020, 3, 29),
        end: new Date(2020, 4, 30),
        remark: 'fffff',
      },
      { id: 8, start: new Date(2020, 4, 31), end: new Date(2020, 5, 12) },
      { id: 9, start: new Date(2020, 6, 3), end: new Date(2020, 8, 30) },
    ],
  },
  {
    name: 'test4',
    id: 4,
    data: [
      { id: 10, start: new Date(2020, 3, 29), end: new Date(2020, 4, 30) },
      { id: 11, start: new Date(2020, 4, 31), end: new Date(2020, 5, 12) },
      { id: 12, start: new Date(2020, 6, 3), end: new Date(2020, 8, 30) },
    ],
  },
];

const option = {
  showMonth: 2,
  locale: ja,
  headFormat: 'yyyy年MM月',
  currentFormat: 'yyyy月MM月dd日',
  getDayColor: (date: Date): string => {
    if (isToday(date)) return DAY_COLOR.TODAY;
    if (isSunday(date) || JapaneseHolidays.isHoliday(date))
      return DAY_COLOR.HOLIDAY;
    if (isSaturday(date)) return DAY_COLOR.SATURDAY;
    return 'none';
  },
  getChartColor: (i: number): string => {
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
  getPagingNextLetter: (month: number) => `${month}ヵ月後`,
  onClick: (event: React.MouseEvent<HTMLInputElement>) =>
    console.log(`${event}テスト`),
};

ReactDOM.render(
  <ReactGanttChart data={products} option={option} />,
  document.getElementById('root')
);
