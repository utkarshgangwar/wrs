const reportModel = require('../models/report.model');
const DateUtil = require('../utils/date.utils');

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
                const data = {
                    projectId: req.body.projectId,
                };
                if (req.body.description) data.description = req.body.description;
                if (req.body.category) data.category = req.body.category;
                if (req.body.probability) data.probability = req.body.probability;
                if (req.body.impact) data.impact = req.body.impact;
                if (req.body.owner) data.owner = req.body.owner;
                if (req.body.mitigation_plan) data.mitigation_plan = req.body.mitigation_plan;
                if (req.body.contigency_plan) data.contigency_plan = req.body.contigency_plan;

                if (req.body.expected_resolution) {
                    data.expected_resolution = req.body.expected_resolution;
                }
                else {
                    data.expected_resolution = DateUtil.addWeek();
                }

                const newReportDoc = await reportModel.create(data);
                if (newReportDoc) {
                    req.apiStatus = {
                        isSuccess: true,
                        data: newReportDoc,
                        customMsg: 'Report created successfully',
                        // totalRecords: count
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