const DateUtil = () => {
    const addWeek = () => {
        const date = new Date();
        date.setDate(date.getDate() + 7);
        return date;
    }

    return {
        addWeek,
    }
}

module.exports = DateUtil();