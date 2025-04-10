
export const formatTimestamp = (isoString) => {
  if (!isoString) return '';

  const date = new Date(isoString);
  const pad = (num) => String(num).padStart(2, '0');

  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1); // Months are 0-based
  const year = date.getFullYear();
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
};

export const calculateDuration = (start, end) => {
  if (!start || !end) return '';

  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffMs = endDate - startDate;

  if (diffMs < 0) return 'Invalid';

  const totalMinutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}`;
};