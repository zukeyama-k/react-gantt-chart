import { eachDayOfInterval, startOfMonth, endOfMonth } from 'date-fns';

export const getIntervalDate = (start: Date, end: Date): Date[] => {
  const intervalDate: Date[] = eachDayOfInterval({
    start: startOfMonth(start),
    end: endOfMonth(end),
  });
  return intervalDate;
};
