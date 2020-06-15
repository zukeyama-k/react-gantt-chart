import { eachDayOfInterval, startOfMonth } from 'date-fns';
export const getIntervalDate = (start, end) => {
    start.setDate(0);
    end.setDate(0);
    const intervalDate = eachDayOfInterval({
        start: startOfMonth(start),
        end
    });
    return intervalDate;
};
