export default function getElapsedTime(timeString: string) {
  const currentTime = new Date();
  const givenTime = new Date(timeString);
  const elapsedMilliseconds = currentTime.getTime() - givenTime.getTime();
  const elapsedMinutes = Math.floor(elapsedMilliseconds / (1000 * 60));

  if (elapsedMinutes < 1) {
    return "방금 전";
  } else if (elapsedMinutes < 60) {
    return `${elapsedMinutes}분 전`;
  } else if (elapsedMinutes < 60 * 24) {
    const elapsedHours = Math.floor(elapsedMinutes / 60);
    return `${elapsedHours}시간 전`;
  } else {
    const elapsedDays = Math.floor(elapsedMinutes / (60 * 24));
    return `${elapsedDays}일 전`;
  }
}
