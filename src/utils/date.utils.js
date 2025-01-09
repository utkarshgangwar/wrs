const moment = require('moment-timezone');

const DateUtil = () => {
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

  return {
    addWeek,
  };
};

module.exports = DateUtil();
