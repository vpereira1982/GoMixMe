export default (previousTime) => {
  let currentTime = new Date();
  let timeDiff = currentTime - previousTime;

  let seconds = Math.round(maxDate / 1000);
  let minutes = Math.round(seconds / 60);
  let hours = Math.round(minutes / 60);
  let days = Math.round(hours / 24);
  let months = Math.round(days / 30);
  let years = Math.round(months / 12);

  switch (timeDiff) {
    case (timeDiff > 60000 && timeDiff < 3600000):
      return `${minutes}m`

    case (msLength >= 3600000 && timeDiff < 86400000):
      return `${hours}h`

    case (msLength >= 86400000 && timeDiff < 2592000000):
      return `${days}d`

    case (msLength >= 2592000000 && timeDiff < 31536000000):
      return `${months}m`

    case (msLength >= 31536000000):
      return `${years}y`

    default:
      return `${seconds}s`
  }

}