const { createProject } = require('../models/project.model');
const DateUtil = require('../utils/date.utils');
const reportModel = require('../models/report.model');
const projectPrameterController = require('./projectPrameter.controller');
const projectModel = require('../models/project.model');

const projectController = () => {
    const handleCreationDocsCreations = async (newProject_id) => {
        const newReportData = {
            projectId: String(newProject_id),
            expected_resolution: DateUtil.addWeek(),
            contingency_plan: '',
            mitigation_plan: '',
            owner: '',
            impact: 'none',
            probability: 'none',
            category: 'none',
            description: '',
            week: 1,
        };
        await reportModel.create(newReportData);
        await projectPrameterController.create(newProject_id, 1);
        return;
    }

    const newProject = async (req, res, next) => {
        if (!req.apiStatus?.isSuccess) {
            return next(); // Pass to exitPoint directly
        }
        else {
            try {
                const data = req.body;
                // const { newProject, count } = await createProject(data);
                const newProject = await createProject(data);
                if (newProject) {
                    // newMongoCollection(newProject._id);
                    await handleCreationDocsCreations(newProject._id);
                    req.apiStatus = {
                        isSuccess: true,
                        data: newProject,
                        customMsg: 'Project created successfully',
                        totalRecords: null
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
    }

    const getAll = async (req, res, next) => {
        if (!req.apiStatus?.isSuccess) {
            return next(); // Pass to exitPoint directly
        } else {
            const filter = {};
            const projection = {};
            const options = { createdAt: -1 };
            const data = await projectModel.find(filter, projection, options);
            if (data) {
                req.apiStatus = {
                    isSuccess: true,
                    data: data,
                    customMsg: 'Projects fetched successfully',
                    totalRecords: data.length
                }
                next();
            } else {
                req.apiStatus = {
                    isSuccess: true,
                    data: [],
                    customMsg: 'No Projects',
                    totalRecords: 0
                }
                next();
            }
        }
    }

    const updateById = async (req, res, next) => {
        if (!req.apiStatus?.isSuccess) {
            return next(); // Pass to exitPoint directly
        } else {
            try {
                const newData = {}
                if (req.body.clientName) newData.clientName = req.body.clientName;
                if (req.body.currentSprint) newData.currentSprint = req.body.currentSprint;
                if (req.body.totalSprint) newData.totalSprint = req.body.totalSprint;
                if (req.body.executiveSummary) newData.executivesummary = req.body.executiveSummary;
                const filter = { _id: req.body.projectId };
                const options = { runValidators: true };
                const updateDoc = await projectModel.findAndUpdate(filter, newData, options);
                if (updateDoc) {
                    req.apiStatus = {
                        isSuccess: true,
                        data: updateDoc,
                        customMsg: 'Project updated successfully',
                    }
                    next();
                }
            } catch (error) {
                req.apiStatus = {
                    isSuccess: false,
                    customMsg: 'Unable to create project',
                    error: error,
                }
                next();
            }
        }
    }

    return {
        newProject,
        getAll,
        handleCreationDocsCreations,
        updateById,
    }
}

module.exports = projectController();