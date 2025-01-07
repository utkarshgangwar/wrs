const projectParameterModel = require('../models/projectParameters.model');
const { getWeekNumWRTProjectCreation } = require('../utils/moment.utils');

const projectParameterController = () => {
    const get = async (req, res, next) => {
        if (!req.apiStatus?.isSuccess) {
            return next(); // Pass to exitPoint directly
        } else {
            try {
                const filter = { projectId: req.body.projectId };
                const projection = {};
                const options = { createdAt: -1 }
                const doc = await projectParameterModel.findOne(filter, projection, options);
                if (doc) {
                    next();
                } else {
                    const data = { projectId: req.body.projectId, week: 1 }
                    const newDoc = await projectParameterModel.create(data);
                    if (newDoc) {
                        req.apiStatus = {
                            isSuccess: true,
                            data: newDoc,
                            customMsg: 'Project created successfully',
                        }
                        next();
                    } else {
                        req.apiStatus = {
                            isSuccess: true,
                            customMsg: 'Unable to create',
                        }
                        next();
                    }
                }
            } catch (error) {
                req.apiStatus = {
                    isSuccess: false,
                    customMsg: 'Unable to create',
                    error: error,
                }
                next();
            }
        }
    }

    return {
        get,
    }
}

module.exports = projectParameterController();