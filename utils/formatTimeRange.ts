export default function formatTimeRange(startsAt: string, workhour: number) {
  const startsTime = new Date(startsAt);
  const endsTime = new Date(startsTime.getTime() + workhour * 60 * 60 * 1000);

  const formattedStartsAt = formatDate(startsTime, true);
  const formattedEndsAt = formatDate(endsTime, false);

  return `${formattedStartsAt} ~ ${formattedEndsAt}`;
}

function formatDate(date: Date, isStartTime: boolean): string {
  const newDate = date.toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return isStartTime
    ? `${year}-${month}-${day} ${hours}:${minutes}`
    : `${hours}:${minutes}`;
}

export const utilFormatDuration = (duration: string, workhour: number) => {
  const date = duration.slice(0, 10).replace(/-/g, ".");
  const hours = parseInt(duration.slice(11, 13));
  const minutes = duration.slice(14, 16);

  let endHours = hours + workhour;

  const startTime = `${hours.toString().padStart(2, "0")}:${minutes}`;
  const endTime = `${endHours}:${minutes}`;

  return `${date} ${startTime}~${endTime}`;
};
