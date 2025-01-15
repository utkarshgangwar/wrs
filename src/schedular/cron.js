const cron = require('node-cron');
const desktime = require('../integration/desktime/desktime.integration');
const projectModel = require('../models/project.model');
const projectController = require('../controllers/project.controller');
const employeeModel = require('../models/employee.model');

const CronJobs = () => {
    // minute (0-59)	hour (0 - 23)	day of the month (1 - 31)	month (1 - 12)	day of the week (0 - 6)
    // * * * * * - every minute
    cron.schedule('* * * * *', async () => {
        console.log('Executing cron ---');
        await getProjects();
        await getEmployees();
    });
};

const getProjects = async () => {
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
}

const getEmployees = async () => {
    try {
        const date = (new Date()).toISOString().split('T')[0];
        const data = await desktime.getEmployees();
        const dataAll = data.employees[date];
        for (const elem in dataAll) {
            if (dataAll.hasOwnProperty(elem)) {
                const filter = { desktime_user_id: dataAll[elem].id };
                const empData = { desktime_user_id: dataAll[elem].id, name: dataAll[elem].name };
                const options = { runValidators: true, upsert: true, new: true };
                const emp = await employeeModel.findAndUpdate(filter, empData, options);
            }
        }
    } catch (error) {
        console.error('Cron job error:', error);
    }
}

module.exports = CronJobs();
