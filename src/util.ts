import {
  eachDayOfInterval,
  startOfMonth,
  addMonths
} from 'date-fns';

export const getIntervalDate = (start: Date, end: Date): Date[] => {
  start.setDate(0);
  end.setDate(0);
  const intervalDate: Date[] = eachDayOfInterval({
    start: startOfMonth(start),
    end
  });
  return intervalDate;
};