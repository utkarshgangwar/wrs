const { validationResult } = require('express-validator');
const _ = require('lodash');

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.apiStatus.isSuccess = false;
        const details = _.map(errors.array(), (error) => {
            return error.msg;
        })
        req.apiStatus.error = {
            statusCode: 400,
            message: 'Validation Error',
            details: details
        };
        return next(); // Pass to next
    }
    next();
};

module.exports = validate;
