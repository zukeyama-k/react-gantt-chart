import { MouseEvent } from 'react';

export type Locale = {
  code?: string;
  formatDistance?: (...args: Array<any>) => any;
  formatRelative?: (...args: Array<any>) => any;
  localize?: {
    ordinalNumber: (...args: Array<any>) => any;
    era: (...args: Array<any>) => any;
    quarter: (...args: Array<any>) => any;
    month: (...args: Array<any>) => any;
    day: (...args: Array<any>) => any;
    dayPeriod: (...args: Array<any>) => any;
  };
  formatLong?: {
    date: (...args: Array<any>) => any;
    time: (...args: Array<any>) => any;
    dateTime: (...args: Array<any>) => any;
  };
  match?: {
    ordinalNumber: (...args: Array<any>) => any;
    era: (...args: Array<any>) => any;
    quarter: (...args: Array<any>) => any;
    month: (...args: Array<any>) => any;
    day: (...args: Array<any>) => any;
    dayPeriod: (...args: Array<any>) => any;
  };
  options?: {
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    firstWeekContainsDate?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  };
};

export type Data = {
  id: number | string;
  start: Date;
  end: Date;
  remark?: string;
};

export interface HeadRowsDataType {
  name?: string;
  href?: string;
  customClass?: string;
  id?: string | number;
  data: Data[];
}

export interface RowType {
  d: Date[];
  isValue?: boolean;
  w?: string;
}

export interface RootProps {
  data: HeadRowsDataType[];
  option: Partial<DefaultOptionsType>;
}

export interface DefaultOptionsType {
  showMonth: number;
  headTitle: string;
  locale: Locale;
  headFormat: string;
  currentFormat: string;
  initDate: Date;
  getDayColor: (date: Date) => string;
  getChartColor: (i: number) => string;
  getPagingPrevLetter: (month: number) => string;
  getPagingNextLetter: (month: number) => string;
  onClick: (event: MouseEvent<HTMLInputElement>) => void;
}

export interface Context {
  options: DefaultOptionsType;
  tooltipRef: React.RefObject<{}>;
}
