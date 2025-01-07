const { createProject } = require('../models/project.model');
// const newMongoCollection = require('../database/newMongoCollection.database');
const projectParameterModel = require('../models/projectParameters.model');

const projectController = () => {
    const newProject = async (req, res, next) => {
        if (!req.apiStatus?.isSuccess) {
            return next(); // Pass to exitPoint directly
        }
        try {
            const data = req.body;
            const { newProject, count } = await createProject(data);
            if (newProject) {
                // newMongoCollection(newProject._id);
                const newPrParamData = { projectId: newProject._id, week: 1 };
                await projectParameterModel.create(newPrParamData);
                req.apiStatus = {
                    isSuccess: true,
                    data: newProject,
                    customMsg: 'Project created successfully',
                    totalRecords: count
                }
            }
            next();
        } catch (error) {
            req.apiStatus = {
                isSuccess: false,
                customMsg: 'Unable to create project',
                error: error,
            }
            next();
        }
    }

    const getReport = () => {

    }

    return {
        newProject,
        getReport,
    }
}

module.exports = projectController();