const moment = require('moment');

const DateUtil = () => {

  function formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  const addWeek = () => {
    // Start with the current date
    const now = moment();
    // Add 7 days
    const future = now.add(7, 'days');
    // Convert that future date to IST (Asia/Kolkata)
    const dateInIST = future.tz('Asia/Kolkata');

    // Return as a formatted string (or as a moment object)
    return dateInIST.format();
  };

  const getWeekDates = (date = new Date()) => {
    const daysOfWeek = [];
    const currentDay = date.getDay();

    // Calculate the start of the week (Sunday)
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - currentDay + 1);

    // Generate dates for the entire week
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      daysOfWeek.push(formatDate(day));
    }
    return daysOfWeek;
  }

  const getDatesFromToNow = (startDate) => {
    const dateArray = [];
    let currentDate = moment(startDate);
    const stopDate = moment(new Date());
    while (currentDate <= stopDate) {
      dateArray.push(moment(currentDate).format('YYYY-MM-DD'))
      currentDate = moment(currentDate).add(1, 'days');
    }
    return dateArray;
  }

  return {
    addWeek,
    getWeekDates,
    getDatesFromToNow,
  };

};

module.exports = DateUtil();
