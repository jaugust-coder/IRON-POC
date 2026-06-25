const convertNumber = (value: number | undefined | null): string =>
  typeof value === 'number' ? value.toLocaleString('en-US') : '0';

const convertReducedNumber = (value: number): string => {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(2)}K`;
  return value.toString();
};

const convertPercentage = (value: number | undefined | null): string =>
  typeof value === 'number' ? `${(value * 100).toFixed(2)}%` : '0.00%';

export { convertNumber, convertPercentage, convertReducedNumber };
