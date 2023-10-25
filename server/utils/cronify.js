module.exports = function (date) {
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1; // getMonth() returns 0-11
  const year = date.getUTCFullYear();  // getFullYear() returns the full year

  return `cron(${minutes} ${hours} ${day} ${month} ? ${year})`;
}
