const handleMongoError = require('../utils/mongoErrorHandler.utils');

const exitPoint = (req, res, next) => {
    let endTime = new Date().getTime() - new Date(req.startTime).getTime();
    let timeStamp = new Date();

    if (req.apiStatus.isSuccess) {
        // let customMsg = req.apiStatus?.customMsg || 'Success';
        let responseObj = {
            status: 200,
            message: req.apiStatus.customMsg,
            data: req.apiStatus.data,
            responseTime: endTime,
            timestamp: timeStamp,
            totalRecords: req.apiStatus.totalRecords,
        }
        res.status(responseObj.status).json(responseObj);
    } else {
        let errorResponse = req.apiStatus.error;
        // Handle MongoDB-specific errors if present
        if (req.apiStatus.error?.code) {
            errorResponse = handleMongoError(req.apiStatus.error);
        }
        let responseObj = {
            status: errorResponse.statusCode,
            message: req.apiStatus?.customMsg,
            details: errorResponse.details,
            responseTime: endTime,
            timestamp: timeStamp,
            totalRecords: req.apiStatus.totalRecords ?? 0,
        }
        res.status(400).json(responseObj)
    }
}

module.exports = exitPoint;