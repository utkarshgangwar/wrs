const timesheetModel = require('../models/timesheet.model');
const projectModel = require('../models/project.model');
const DateUtil = require('../utils/date.utils.js');

const desktime = require('../integration/desktime/desktime.integration');
const employeeModel = require('../models/employee.model.js');

const timesheetController = () => {
    const getAllByProjectId = async (req, res, next) => {
        const projectDoc = await projectModel.findOne(
            { _id: req.body.projectId },
            { startDate: 1, desktime_project_id: 1, employees: 1, name: 1 },
            {}
        );
        const lastTimesheetDoc = await timesheetModel.findOne(
            { projectId: projectDoc._id },
            {},
            { sort: { createdAt: -1 } }
        )

        const startDate = lastTimesheetDoc?.date || (projectDoc.startDate * 1000);

        const datesTillNow = DateUtil.getDatesFromToNow(new Date(startDate));
        if (datesTillNow.length) {
            for (const emp of projectDoc.employees) {
                for (const date of datesTillNow) {
                    const weekDates = DateUtil.getWeekDates(new Date(date));
                    const projectId = projectDoc.desktime_project_id;
                    for (const date of weekDates) {
                        const data = await desktime.getEmployeeWorkingHoursByProject(emp, date);
                        // Check user & get user _id
                        const empDoc = await employeeModel.getUserById({ desktime_user_id: emp });
                        const project = await projectModel.find({ desktime_project_id: projectId }, { _id: 1 }, {});
                        // Timesheet handle start --
                        const filter = { projectId: project[0]._id, employeeId: empDoc._id, date: date };
                        const sum = data.projects.reduce((acc, obj) => {
                            if (String(obj.project_id) === String(projectId)) { acc += obj.duration; return acc; }
                            else { return acc; }
                        }, 0)
                        const timesheetData = { date: date, seconds: sum };
                        const options = { runValidators: true, upsert: true, new: true };

                        const timesheet = await timesheetModel.findAndUpdate(filter, timesheetData, options)
                        // Timesheet handle end --
                    }
                }
            }
            req.apiStatus = {
                isSuccess: true,
                customMsg: 'success'
            }
            next();
        } else {
            req.apiStatus = {
                isSuccess: true,
                customMsg: 'No new doc for timesheet for project : ' + projectDoc.name
            }
        }
        return next();
    }

    return {
        getAllByProjectId,
    }
}

module.exports = timesheetController();