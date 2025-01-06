const moment = require('moment');

const Moment = () => {

    const getWeekNum = (data) => {
        const date = moment(data || new Date());
        const isoWeekNumber = date.isoWeek();
        return isoWeekNumber;
    };

    const checkWeekMatch = (date) => {
        const currentWeek = getWeekNum();
        const docWeek = getWeekNum(date);
        if (currentWeek === docWeek) return true;
        else return false;
    }

    return {
        checkWeekMatch
    }
};

module.exports = Moment();