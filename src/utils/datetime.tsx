

/**
 * Parses a date string in YYYY-MM-DD format to a Date object.
 * Manually parses the string to avoid timezone issues in JavaScript.
 * @param {string} dateString - The date string in YYYY-MM-DD format
 * @returns {Date} - A Date object set to midnight UTC
 */
function parseDateOnly(dateString: string): Date {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
}


/**
 * Gets the date range for a period spanning past and future months from today.
 * Returns an array of two dates in YYYY-MM-DD format: [pastDate, currentDate]
 * @param {number} [pastMonths=12] - Number of months to look back
 * @param {number} [futureMonts=0] - Number of months to look forward
 * @returns {string[]} - Array of two date strings in YYYY-MM-DD format
 */
export const getLastPeriods = (pastMonths: number = 12, futureMonts: number = 0) => {
    const today = new Date();

    const currentPeriod = new Date(today.getFullYear(), today.getMonth() + futureMonts, 2);

    const pastPeriod = new Date(today.getFullYear(), today.getMonth() - pastMonths, 2);

    const formatDate = (date: any) => date.toISOString().split('T')[0];

    return [formatDate(pastPeriod), formatDate(currentPeriod)];
}

/**
 * Extracts the period in YYYYMM format from a given date.
 * @param {any} date - A date string or Date object
 * @returns {number} - The period as a number in YYYYMM format (e.g., 202604 for April 2026)
 */
export const getPeriodFromDate = (date: any): number=> {
    const date_ = new Date(date);
    return parseInt(date_.getUTCFullYear().toString() + String(date_.getUTCMonth() + 1).padStart(2, '0'))
}


/**
 * Checks if a target date is within a specified number of months from a reference date.
 * Compares dates at midnight UTC to avoid timezone issues.
 * @param {string} dateStr - The target date string to compare
 * @param {number} [months=2] - The number of months threshold
 * @param {Date} [compareDate] - The reference date (defaults to today if not provided)
 * @returns {boolean} - True if the target date is within the specified months, false otherwise
 */
export const isLessThanMonths = (dateStr: string, months: number = 2, compareDate?: Date): boolean => {
    const targetDate = new Date(dateStr);
    const refDate = compareDate ? new Date(compareDate) : new Date();

    targetDate.setHours(0, 0, 0, 0);
    refDate.setHours(0, 0, 0, 0);

    const monthsDiff = 
        (targetDate.getFullYear() - refDate.getFullYear()) * 12 +
        (targetDate.getMonth() - refDate.getMonth());

    return monthsDiff <= months || 
           (monthsDiff === months && refDate.getDate() < targetDate.getDate());
}

/**
 * Formats a date string or object according to the specified format.
 * - Strings as YYYY-MM-DD (Postgres DATE) are manually parsed, avoiding timezone issues in JS.
 * - Strings with time (TIMESTAMP/ISO) are passed directly to `new Date`.
 * - Date objects are used as is.
 * @param {Date | string | null} baseDate - The date to format (Date object, date string, or null)
 * @param {string} [format='dd/MM/yyyy'] - The desired output format (supports 'dd/MM/yy', 'MM/yy', 'yyyy-MM-dd', or defaults to 'dd/MM/yyyy')
 * @returns {string} - The formatted date string, or empty string if baseDate is null/falsy
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


/**
 * Converts a period in YYYYMM format to a localized month and year name.
 * @param {number} period - The period in YYYYMM format (e.g., 202603 for March 2026)
 * @param {string} [locale='pt'] - The locale for the month name ('pt' for Portuguese or 'en' for English)
 * @returns {string} - The formatted month and year name (e.g., 'Março de 2026' for pt, 'March 2026' for en)
 */
export const getPeriodName = (
    period: number | undefined,
    locale: string = 'pt'
): string | undefined => {
    if (period === undefined) {
        return period
    }

    const monthNamesPt = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    const monthNamesEn = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const monthNames = locale === 'en' ? monthNamesEn : monthNamesPt;
    const separator = locale === 'en' ? ' ' : ' de ';

    const periodStr = String(period).padStart(6, '0');
    const year = parseInt(periodStr.substring(0, 4));
    const month = parseInt(periodStr.substring(4, 6));

    if (month < 1 || month > 12) {
        return '';
    }

    return `${monthNames[month - 1]}${separator}${year}`;
}