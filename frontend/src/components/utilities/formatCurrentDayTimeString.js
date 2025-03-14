import dayjs from "dayjs";

export default function formatCurrentDayTimeString () {
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentHourNumber = dayjs().hour();
  const currentDayNumber = dayjs().day();

  let timeOfDayString;
  switch (true) {
    case currentHourNumber < 6:
      timeOfDayString = "Night";
      break;
    case currentHourNumber < 12:
      timeOfDayString = "Morning";
      break;
    case currentHourNumber < 18:
      timeOfDayString = "Afternoon";
      break;
    default:
      timeOfDayString = "Evening";
      break;
  }

  return `${weekdays[currentDayNumber]} ${timeOfDayString}`;
}