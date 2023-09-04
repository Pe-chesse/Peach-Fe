export default function timeAgo(time) {
  const currentTime = new Date();
  const timestamp = new Date(time);

  const timeDiff = currentTime - timestamp;
  console.log(timeDiff);
  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (seconds < 60) {
    return `방금`;
  } else if (minutes < 60) {
    return `${minutes}분 전`;
  } else if (hours < 24) {
    return `${hours}시간 전`;
  } else {
    return timestamp.toLocaleDateString();
  }
}
