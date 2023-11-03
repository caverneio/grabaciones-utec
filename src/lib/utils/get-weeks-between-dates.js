function getWeeksBetweenDates(dateA, dateB) {
  const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds
  const timeA = dateA.getTime(); // Get the time in milliseconds for dateA
  const timeB = dateB.getTime(); // Get the time in milliseconds for dateB

  const daysDifference = Math.abs((timeA - timeB) / oneDay); // Calculate the absolute difference in days
  const weeksDifference = Math.floor(daysDifference / 7); // Calculate the number of weeks

  return weeksDifference;
}

export { getWeeksBetweenDates };
