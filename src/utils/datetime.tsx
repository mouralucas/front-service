

function parseDateOnly(dateString: string): Date {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day); // cria no fuso local, sem shift
}


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

/**
 * Formats a date str or object.
 * - Strings as YYYY-MM-DD (Postgres DATE) are manually parsed,
 *   avoiding timezone issues in JS.
 * - Strings with time (TIMESTAMP/ISO) are passed directly to `new Date`.
 * - Date objects are used as is.
 */
export const formatDate = (
    baseDate: Date | string | null, 
    format: string = 'dd/MM/yyyy'
): string => {
    if (!baseDate) return '';

    let date: Date;
    if (baseDate instanceof Date) {
        date = baseDate;
    } else {
        if (typeof baseDate === "string" && /^\d{4}-\d{2}-\d{2}$/.test(baseDate)) {
            date = parseDateOnly(baseDate);
        } else {

            date = new Date(baseDate);
        }
    }

    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yy = String(date.getFullYear()).slice(-2);

    if (format === 'dd/MM/yy') {
        return `${dd}/${mm}/${yy}`;
    } else if (format === 'MM/yy') {  
        return `${mm}/${yy}`;
    } else if (format === 'yyyy-MM-dd') {
        return `${date.getFullYear()}-${mm}-${dd}`;
    }

    // Default format
    return `${dd}/${mm}/${date.getFullYear()}`;
    
}