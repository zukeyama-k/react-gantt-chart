import { eachDayOfInterval, startOfMonth, endOfMonth } from 'date-fns';
export const getIntervalDate = (start, end) => {
    const intervalDate = eachDayOfInterval({
        start: startOfMonth(start),
        end: endOfMonth(end)
    });
    return intervalDate;
};
