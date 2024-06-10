export const calculateIncreasePercent = (original: number, current: number): number => {
  return parseFloat((((current - original) / original) * 100).toFixed(0));
};
