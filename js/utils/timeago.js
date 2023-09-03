export default function timeAgo(time) {
  const currentTime = new Date();
  const timestamp = new Date(time);

  const timeDiff = currentTime - timestamp;
  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (seconds < 60) {
    return `${seconds}초 전`;
  } else if (minutes < 60) {
    return `${minutes}분 전`;
  } else if (hours < 24) {
    return `${hours}시간 전`;
  } else {
    return timestamp.toLocaleDateString(); // 일정 시간 이상 경과한 경우 날짜 형식으로 표시
  }
}
