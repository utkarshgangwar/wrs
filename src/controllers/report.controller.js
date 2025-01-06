const reportModel = require('../models/report.model');
const Moment = require('../utils/moment.utils');
const projectController = require('./project.controller');

const reportController = () => {
    const create = async (req, res, next) => {
        if (!req.apiStatus?.isSuccess) {
            return next(); // Pass to exitPoint directly
        } else {
            try {
                // const filter = { projectId: req.body.projectId }
                // const projection = { _id: 1, createdAt: 1 };
                // const option = { createdAt: -1 };
                // const findOneReport = await reportModel.findOne(filter, projection, option);
                // const isWeekMatch = Moment.checkWeekMatch(findOneReport.createdAt);
                // if (isWeekMatch) {
                //     delete req.body['projectId'];
                //     req.body.doc_id = findOneReport._id;
                //     await update(req, res, next);
                // } else {
                const data = req.body;
                const { newProjectParameter, count } = await reportModel.create(data);
                if (newProjectParameter) {
                    req.apiStatus = {
                        isSuccess: true,
                        data: newProjectParameter,
                        customMsg: 'Report created successfully',
                        totalRecords: count
                    }
                }
                // }
                next();
            } catch (error) {
                req.apiStatus = {
                    isSuccess: false,
                    customMsg: 'Unable to create report',
                    error: error,
                }
                next();
            }
        }
    }

    const update = async (req, res, next) => {
        if (!req.apiStatus?.isSuccess) {
            return next(); // Pass to exitPoint directly
        } else {
            try {
                const filter = { _id: req.body.doc_id };
                const data = req.body;
                delete req.body['doc_id'];
                const options = {};
                const updatedReport = await reportModel.updateOne(filter, data, options);
                if (updatedReport.modifiedCount === 1) {
                    req.apiStatus = {
                        isSuccess: true,
                        // data: updatedReport,
                        customMsg: 'Report updated successfully',
                    }
                }
                next();
            } catch (error) {
                req.apiStatus = {
                    isSuccess: false,
                    customMsg: 'Unable to update report',
                    error: error,
                }
                next();
            }
        }
    }

    const getReport = async (req, res, next) => {
        if (!req.apiStatus?.isSuccess) {
            return next(); // Pass to exitPoint directly
        } else {
            try {
                const filter = { projectId: req.body.projectId };
                const projection = { __v: 0, updatedAt: 0, createdAt: 0 };
                const options = {};
                const data = await reportModel.getAll(filter, projection, options);
                if (data) {
                    req.apiStatus = {
                        isSuccess: true,
                        data: data,
                        customMsg: 'Reports fetched',
                        totalRecords: data.length
                    }
                } else {
                    req.apiStatus = {
                        isSuccess: true,
                        customMsg: 'No reports',
                    }
                }
                next();
            } catch (error) {
                req.apiStatus = {
                    isSuccess: false,
                    customMsg: 'Unable to get reports',
                    error: error,
                }
                next();
            }
        }
    }

    return {
        create,
        update,
        getReport
    }
};


module.exports = reportController();