export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = parseInt(date.getHours().toString(), 10);
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const ampm = hours >= 12 ? "오후" : "오전";
  const formattedHours = hours % 12 || 12;

  return `${year}년 ${month}월 ${day}일 ${ampm} ${formattedHours}시 ${minutes}분`;
}
