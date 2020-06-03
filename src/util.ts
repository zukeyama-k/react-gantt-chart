import {
  eachDayOfInterval,
  startOfMonth,
  addMonths
} from 'date-fns';

export const getIntervalDate = (start: number, end: number): Date[] => {
  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() + start);
  const endDate = addMonths(currentDate, end);
  currentDate.setDate(0);
  endDate.setDate(0);
  const intervalDate: Date[] = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endDate,
  });
  return intervalDate;
};