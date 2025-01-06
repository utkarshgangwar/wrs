const projectParameterModel = require('../models/projectParameter.model');

const projectParameterController = () => {
    const createProjectParameter = async (req, res, next) => {
        if (!req.apiStatus?.isSuccess) {
            return next(); // Pass to exitPoint directly
        }
        try {
            const data = req.body;
            const { newProjectParameter, count } = await projectParameterModel.createProjectParameter(data);
            if (newProjectParameter) {
                req.apiStatus = {
                    isSuccess: true,
                    data: newProjectParameter,
                    customMsg: 'Project parameter created successfully',
                    totalRecords: count
                }
            }
            next();
        } catch (error) {
            req.apiStatus = {
                isSuccess: false,
                customMsg: 'Unable to create project parameter',
                error: error,
            }
        }
    }

    return {
        createProjectParameter,
    }
};

module.exports = projectParameterController();