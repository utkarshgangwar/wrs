const express = require('express');
const router = express.Router();
const projectRoutes = require('./project.routes');
const ping = require('./ping.routes');
const reportRouter = require('./report.routes');
const projectParameterRouter = require('./projectParameter.routes');
const commericalHealthRouter = require('./commericalHealth.routes');
const timesheetRouter = require('./timesheet.routes.js');
const xlsx = require('./xlsx.routes.js');

router.use('/ping', ping);
router.use('/project', projectRoutes);
router.use('/report', reportRouter);
router.use('/project-parameter', projectParameterRouter);
router.use('/commercial-health', commericalHealthRouter);
router.use('/timesheet', timesheetRouter);
router.use('/xlsx', xlsx);

module.exports = router;