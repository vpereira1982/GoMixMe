export default (previousTime) => {
  const currentTime = new Date();
  const timeDiff = currentTime - Date.parse(previousTime);
  const seconds = Math.round(timeDiff / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);
  const months = Math.round(days / 30);
  const years = Math.round(months / 12);

  switch (true) {
    case (timeDiff > 60000 && timeDiff < 3600000):
      return `${minutes}m`

    case (timeDiff >= 3600000 && timeDiff < 86400000):
      return `${hours}h`

    case (timeDiff >= 86400000 && timeDiff < 2592000000):
      return `${days}d`

    case (timeDiff >= 2592000000 && timeDiff < 31536000000):
      return `${months}m`

    case (timeDiff >= 31536000000):
      return `${years}y`

    default:
      return `${seconds}s`
  }

}