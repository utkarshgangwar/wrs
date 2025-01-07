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

    const getWeekNumWRTProjectCreation = (date) => {
        const currentWeek = getWeekNum();
        const docWeek = getWeekNum(date);
        const diff = currentWeek - docWeek;
        return diff;
    }

    return {
        checkWeekMatch,
        getWeekNumWRTProjectCreation
    }
};

module.exports = Moment();