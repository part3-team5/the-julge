// 세 자리마다 쉼표로 구분하여 표시하는 함수
export const formatCurrency = (value?: number): string => {
  if (value === undefined) return "";
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
