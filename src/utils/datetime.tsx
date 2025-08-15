

export const getLastPeriods = (monthsAgo: number = 12) => {
    const today = new Date();

    const currentPeriod = new Date(today.getFullYear(), today.getMonth(), 2);

    const pastPeriod = new Date(today.getFullYear(), today.getMonth() - monthsAgo, 2);

    const formatDate = (date: any) => date.toISOString().split('T')[0];

    return [formatDate(pastPeriod), formatDate(currentPeriod)];
}

export const getPeriodFromDate = (date: any): number=> {
    const date_ = new Date(date);
    return parseInt(date_.getUTCFullYear().toString() + String(date_.getUTCMonth() + 1).padStart(2, '0'))
}


export const isLessThanMonths = (dateStr: string, months: number = 2, compareDate?: Date): boolean => {
    // TODO: can be simplified using the getPeriodFromDate function
    //  e.g. getPeriodFromDate(dateStr) - getPeriodFromDate(compareDate) < months
    //  Alse be able to receive dateStr as Date or string, the same for compareDate
    
    const targetDate = new Date(dateStr);
    const refDate = compareDate ? new Date(compareDate) : new Date();

    targetDate.setHours(0, 0, 0, 0);
    refDate.setHours(0, 0, 0, 0);

    const monthsDiff = 
        (targetDate.getFullYear() - refDate.getFullYear()) * 12 +
        (targetDate.getMonth() - refDate.getMonth());
        console.log('Current ' + dateStr  + ' Diff: ' + monthsDiff + ' months ' + months);

    return monthsDiff <= months || 
           (monthsDiff === months && refDate.getDate() < targetDate.getDate());
}