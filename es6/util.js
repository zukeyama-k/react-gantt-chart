import { eachDayOfInterval, startOfMonth, addMonths } from 'date-fns';
export const getIntervalDate = (start, end, initDate) => {
    const currentDate = initDate;
    currentDate.setMonth(currentDate.getMonth() + start);
    const endDate = addMonths(currentDate, end);
    currentDate.setDate(0);
    endDate.setDate(0);
    const intervalDate = eachDayOfInterval({
        start: startOfMonth(currentDate),
        end: endDate,
    });
    return intervalDate;
};
