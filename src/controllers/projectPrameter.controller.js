const projectParameterModel = require('../models/projectParameters.model');
const reportModel = require('../models/report.model');
const momentUtils = require('../utils/moment.utils');
const { getWeekNumWRTProjectCreation } = require('../utils/moment.utils');

async function report(projectId) {
    const reportDoc = await reportModel.getAll({ projectId });

    // Tally up probabilities and impacts
    const riskCategories = reportDoc.reduce(
        (acc, item) => {
            if (item.probability) {
                switch (item.probability) {
                    case 'low':
                        acc.probabilities.low += 1;
                        break;
                    case 'medium':
                        acc.probabilities.med += 1;
                        break;
                    case 'high':
                        acc.probabilities.high += 1;
                        break;
                }
            }
            if (item.impact) {
                switch (item.impact) {
                    case 'low':
                        acc.impacts.low += 1;
                        break;
                    case 'medium':
                        acc.impacts.med += 1;
                        break;
                    case 'high':
                        acc.impacts.high += 1;
                        break;
                }
            }
            return acc;
        },
        {
            impacts: { low: 0, med: 0, high: 0 },
            probabilities: { low: 0, med: 0, high: 0 },
        }
    );

    const calculateRisk = async (probLevel, impactLevel) => {
        // Simple rule: if either is high -> 'red', else if medium -> 'yellow', else 'green'
        let compiledRisk = 'green';
        if (probLevel === 'high' || impactLevel === 'high') {
            compiledRisk = 'red';
        } else if (probLevel === 'medium' || impactLevel === 'medium') {
            compiledRisk = 'yellow';
        }

        await projectParameterModel.updateOne({ projectId: projectId, risk: compiledRisk })
        return
    }

    // Helper to get the highest level for either probabilities or impacts
    const getHighestLevel = (counts) => {
        if (counts.high > 0) return 'high';
        if (counts.med > 0) return 'medium';
        return 'low';
    };

    const probLevel = getHighestLevel(riskCategories.probabilities);
    const impactLevel = getHighestLevel(riskCategories.impacts);
    await calculateRisk(probLevel, impactLevel);
    return;
}

async function getDocByProjectId(projectId) {
    const filter = { projectId: projectId };
    const projection = {};
    const options = { createdAt: -1 }
    const doc = await projectParameterModel.findOne(filter, projection, options);
    const weekCheck = momentUtils.getWeekNumWRTProjectCreation(doc.createdAt);
    if (weekCheck < 0) {
        const newDoc = projectParameterModel.create({})
        return doc;
    } else {
        return doc;
    }
}

const projectParameterController = () => {

    const create = async (projectId, week) => {
        const newPrParamData = { projectId: projectId, week: week || 1 };
        return await projectParameterModel.create(newPrParamData);
    }

    const get = async (req, res, next) => {
        if (!req.apiStatus?.isSuccess) {
            return next(); // Pass to exitPoint directly
        } else {
            try {
                await report(req.body.projectId);
                const doc = await getDocByProjectId(req.body.projectId);
                if (doc) {
                    req.apiStatus = {
                        isSuccess: true,
                        data: doc,
                        customMsg: 'Project parameters fetched',
                    }
                    next();
                } else {
                    const data = { projectId: req.body.projectId, week: 1 }
                    const doc = await projectParameterModel.get(data);
                    if (doc) {
                        req.apiStatus = {
                            isSuccess: true,
                            data: doc,
                            customMsg: 'Project parameter fetched',
                        }
                        next();
                    }
                }
            } catch (error) {
                req.apiStatus = {
                    isSuccess: false,
                    customMsg: 'Unable to get',
                    error: error,
                }
                next();
            }
        }
    }

    return {
        create,
        get,
    }
}

module.exports = projectParameterController();