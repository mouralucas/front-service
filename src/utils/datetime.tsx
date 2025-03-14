

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