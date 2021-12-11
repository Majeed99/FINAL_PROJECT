function calcTime(uploadDate) {
  const current = new Date();
  const publishDate = new Date(uploadDate);
  const res = current.getTime() - publishDate.getTime();
  if (res / 1000 < 60) return parseInt(res / 1000) + " sec ago";
  else if (res / (1000 * 60) < 60)
    return parseInt(res / (1000 * 60)) + " min ago";
  else if (res / (1000 * 3600) < 24)
    return parseInt(res / (1000 * 3600)) + " hours ago";
  else if (res / (1000 * 3600 * 24) < 30)
    return parseInt(res / (1000 * 3600 * 24)) + " days ago";
  else if (res / (1000 * 3600 * 24 * 30) < 12)
    return parseInt(res / (1000 * 3600 * 24 * 30)) + " months ago";
  else return parseInt(res / (1000 * 3600 * 24 * 30 * 12)) + " years ago";
}
export default calcTime;
