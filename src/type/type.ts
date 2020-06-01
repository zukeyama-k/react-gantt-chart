export type Data = { start: Date; end: Date };

export interface HeadRowsDataType {
  name?: string;
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
  isHoliday: (date: Date) => string | undefined,
  WEEK_JA: string[],
  CHART_COLOR: { [key: string]: string },
  DAY_COLOR:{ [key: string]: string },
  headTitle: string,
  yearLetter: string,
  monthLetter: string,
  pagingPrevLetter: string,
  pagingNextLetter: string
}