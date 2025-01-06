const entryPoint = (req, res, next) => {
    req.apiStatus = {
        customMsg: 'Success',
        error: {},
        isSuccess: true,
        data: null,
        customMsg: null,
        totalRecords: null,
    };
    req.startTime = Date.now();
    next();
}

module.exports = entryPoint;