import moving from './moving';

export const hasMovingHoliday = (date) => !!moving[date];

export const hasHoliday = (date) => 
    hasMovingHoliday(date.add(13, 'd').format('MM-DD'));

export const getMovigHoliday = (date) => moving[date];
