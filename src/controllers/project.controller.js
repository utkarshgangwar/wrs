const { createProject } = require('../models/project.model');
// const newMongoCollection = require('../database/newMongoCollection.database');
const projectParameterModel = require('../models/projectParameters.model');
const reportController = require('./report.controller');
const DateUtil = require('../utils/date.utils');
const reportModel = require('../models/report.model');
const projectPrameterController = require('./projectPrameter.controller');

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
                const newReportData = {
                    projectId: newProject._id,
                    expected_resolution: DateUtil.addWeek(),
                    contingency_plan: '',
                    mitigation_plan: '',
                    owner: '',
                    impact: 'none',
                    probability: 'none',
                    category: 'none',
                    description: '',
                };
                await projectPrameterController.create(newProject._id);
                await reportModel.create(newReportData);
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