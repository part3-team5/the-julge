export const formatDateTime = (date: string, format: string) => {
  const options: Intl.DateTimeFormatOptions = {};
  if (format === "time") {
    options.hour = "numeric";
    options.minute = "numeric";
  }
  return new Date(date).toLocaleString("ko-KR", options);
};

export const calculateEndTime = (startTime: string, workhour: number) => {
  const endTimeMillis = new Date(startTime).getTime() + workhour * 3600000;
  return new Date(endTimeMillis);
};
