const cron = require('node-cron');
const desktime = require('../integration/desktime/desktime.integration');
const projectModel = require('../models/project.model');
const projectController = require('../controllers/project.controller');

const CronJobs = () => {
    // Runs every 5 minutes
    cron.schedule('* * * * *', async () => {
        console.log('Executing cron ---');
        try {
            const dataDoc = await desktime.getProjects();
            // console.log('Executing cron ---', typeof projects, projects);

            // Option A: Sequential (each update waits for the previous to finish)
            // for (const element of dataDoc.projects) {
            //     delete element.tasks;
            //     const filter = { desktime_project_id: element.id };
            //     const updateDoc = {
            //         desktime_project_id: element.id,
            //         name: element.name,
            //         desktimeInfo: element,
            //         clientName: '-',
            //         managers: [],
            //         startDate: element.created_at,
            //     };
            //     await projectModel.findAndUpdate(filter, updateDoc, { runValidators: true, upsert: true, new: true });
            // }

            // Option B: Parallel (all updates at once)
            await Promise.all(
                dataDoc.projects.map(async (element) => {
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
                })
            );

        } catch (error) {
            console.error('Cron job error:', error);
        }
    });
};

module.exports = CronJobs();
