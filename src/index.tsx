import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ReactGanttChart from './ReactGanttChart';
import { ProductsDataType } from './type/type';

const products: ProductsDataType[] = [
  {
    productName: 'test',
    data: [
      { start: new Date(2020, 3, 29), end: new Date(2020, 4, 30) },
      { start: new Date(2020, 4, 31), end: new Date(2020, 5, 12) },
      { start: new Date(2020, 6, 3), end: new Date(2020, 8, 30) },
    ],
  },
  {
    productName: 'test',
    data: [
      { start: new Date(2020, 3, 29), end: new Date(2020, 4, 30) },
      { start: new Date(2020, 4, 31), end: new Date(2020, 5, 12) },
      { start: new Date(2020, 6, 3), end: new Date(2020, 8, 30) },
    ],
  },
  {
    productName: 'test',
    data: [
      { start: new Date(2020, 3, 29), end: new Date(2020, 4, 30) },
      { start: new Date(2020, 4, 31), end: new Date(2020, 5, 12) },
      { start: new Date(2020, 6, 3), end: new Date(2020, 8, 30) },
    ],
  },
  {
    productName: 'test',
    data: [
      { start: new Date(2020, 3, 29), end: new Date(2020, 4, 30) },
      { start: new Date(2020, 4, 31), end: new Date(2020, 5, 12) },
      { start: new Date(2020, 6, 3), end: new Date(2020, 8, 30) },
    ],
  },
];

const option = {
  showMonth: 3,
};

ReactDOM.render(
  <ReactGanttChart data={products} option={option} />,
  document.getElementById('root')
);
