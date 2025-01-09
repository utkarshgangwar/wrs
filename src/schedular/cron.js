const cron = require('node-cron');
const desktime = require('../integration/desktime/desktime.integration');
const projectModel = require('../models/project.model');
const projectController = require('../controllers/project.controller');

const CronJobs = () => {
    // minute (0-59)	hour (0 - 23)	day of the month (1 - 31)	month (1 - 12)	day of the week (0 - 6)
    // * * * * * - every minute
    cron.schedule('* * * * *', async () => {
        console.log('Executing cron ---');
        try {
            const dataDoc = await desktime.getProjects();
            for (const element of dataDoc.projects) {
                delete element.tasks;
                const filter = { desktime_project_id: element.id };
                const updateDoc = {
                    desktime_project_id: element.id,
                    name: element.name,
                    desktimeInfo: element,
                    clientName: '-',
                    managers: [],
                    startDate: element.created_at,
                };
                const options = { runValidators: true, upsert: true, includeResultMetadata: true }
                const rawResult = await projectModel.findAndUpdate(filter, updateDoc, options);
                const { lastErrorObject } = rawResult;
                const wasCreated = lastErrorObject.updatedExisting === false;
                if (wasCreated) {
                    await projectController.handleCreationDocsCreations(lastErrorObject.upserted);
                }
            }
        } catch (error) {
            console.error('Cron job error:', error);
        }
    });
};

module.exports = CronJobs();
