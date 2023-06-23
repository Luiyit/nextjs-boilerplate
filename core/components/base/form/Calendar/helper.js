const monthsFull = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const getDays = (year, month) => {
  if (!month) return 31;

  const dt = new Date(year, month + 1, 0);
  const currentMonth = dt.getMonth() + 1;
  const currentYear = dt.getFullYear();
  return new Date(currentYear, currentMonth, 0).getDate();
};

export const getDateOptions = (year, month, fromNow) => {
  const date = new Date();
  const currentYear = date.getFullYear();
  const years_length = fromNow ? 3 : 100;

  return {
    days: new Array(getDays(year || currentYear, month))
      .fill()
      .map((_, idx) => ({ label: idx + 1, value: idx + 1 })),
    months: monthsFull.map((value, index) => ({ label: value, value: index })),
    years: new Array(years_length).fill().map((_, idx) => ({
      label: fromNow ? currentYear + idx : currentYear - idx,
      value: fromNow ? currentYear + idx : currentYear - idx,
    })),
  };
};
