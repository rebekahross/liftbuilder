import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

export default function formatElapsedTimeString (seconds) {
  const duration = dayjs.duration(seconds, "seconds");

  let resultStrings = [];
  if (duration.hours() > 0) {
    if (duration.hours() === 1) {
      resultStrings.push("1 Hour");
    } else {
      resultStrings.push(`${duration.hours()} Hours`)
    }
  }
  if (duration.minutes() > 0) {
    if (duration.minutes() === 1) {
      resultStrings.push("1 Minute")
    } else {
      resultStrings.push(`${duration.minutes()} Minutes`)
    }
  }
  if (duration.seconds() > 0) {
    if (duration.seconds() === 1) {
      resultStrings.push("1 Second")
    } else {
      resultStrings.push(`${duration.seconds()} Seconds`)
    }
  }

  if (resultStrings.length === 0) {
    return 'Start Timer Above'
  }

  return resultStrings.join(', ')
}