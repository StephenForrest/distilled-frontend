export const convertDateToUTC = (dateString: string) => {
  const date = new Date(`${dateString} 00:00:00`);
  return date.toISOString();
};

export const formatDate = date => {
  // Convert the date to the local time zone
  date = new Date(date.toString());

  // Get the day and month from the date object
  var day = date.getDate();
  var month = date.getMonth();

  // Add the appropriate ordinal (e.g. "st", "nd", "rd") to the day
  var ordinal = 'th';
  if (day === 1 || day === 21 || day === 31) {
    ordinal = 'st';
  } else if (day === 2 || day === 22) {
    ordinal = 'nd';
  } else if (day === 3 || day === 23) {
    ordinal = 'rd';
  }
  day = day + ordinal;

  // Convert the month number to the name of the month (e.g. 0 => "Jan")
  var monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  month = monthNames[month];

  // Check if the year is different from the current year, and add it if necessary
  var currentYear = new Date().getFullYear();
  var year = date.getFullYear();
  if (year !== currentYear) {
    return day + ' ' + month + ' ' + year;
  }

  // Return the formatted date string
  return day + ' ' + month;
};

export const getDateNDaysFromToday = (n: number) => {
  // Create a date object for today
  const today = new Date();

  // Add 7 days to the date object
  const sevenDaysFromToday = new Date(
    today.getTime() + n * 24 * 60 * 60 * 1000,
  );

  // Return the date in the 'YYYY-MM-DD' format
  return sevenDaysFromToday.toISOString().split('T')[0];
};

export const formatDateForInput = (d: Date) =>
  d.getFullYear().toString().padStart(4, '0') +
  '-' +
  (d.getMonth() + 1).toString().padStart(2, '0') +
  '-' +
  d.getDate().toString().padStart(2, '0');

export const getDateSevenDaysFromToday = () => getDateNDaysFromToday(7);

export const completionFormatted = (completionNumber: number | undefined) => {
  const value = Math.ceil((completionNumber || 0) * 100);
  if (value > 100) {
    return 100;
  } else {
    return value;
  }
};

export const omit = (key, obj) => {
  const { [key]: omitted, ...rest } = obj;
  return rest;
};
