/**
 * Creates a Date instance from a datetime object in the local time in Lima.
 * @param {string} year - The year of the datetime.
 * @param {string} month - The month of the datetime.
 * @param {string} day - The day of the datetime.
 * @param {string} hour - The hour of the datetime.
 * @param {string} minute - The minute of the datetime.
 * @returns {Date} A Date instance representing the local time in Lima.
 */
export function parseDatetime(year, month, day, hour, minute) {
  const options = { timeZone: "America/Lima" };
  const date = new Date(`${year}-${month}-${day}T${hour}:${minute}:00`);
  return new Date(date.toLocaleString("en-US", options));
}
