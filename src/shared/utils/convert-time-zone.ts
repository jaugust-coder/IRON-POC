const months = [
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
  'December'
];

const pad = (value: number): string => value.toString().padStart(2, '0');

function convertTimeZone(
  dateStr: string,
  timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
): string {
  const utcDate = new Date(`${dateStr} UTC`);
  const localDate = new Date(utcDate.toLocaleString('en-US', { timeZone }));

  const year = localDate.getFullYear();
  const month = months[localDate.getMonth()];
  const day = pad(localDate.getDate());
  const hours = pad(localDate.getHours());
  const minutes = pad(localDate.getMinutes());
  const seconds = pad(localDate.getSeconds());

  return `${month} ${day}, ${year} at ${hours}:${minutes}:${seconds}`;
}

export default convertTimeZone;
