const express = require('express');
const router = express.Router();
const projectRoutes = require('./project.routes');
const ping = require('./ping.routes');
const reportRouter = require('./report.routes');
const projectParameterRouter = require('./projectParameter.routes');

router.use('/ping', ping);
router.use('/project', projectRoutes);
router.use('/report', reportRouter);
router.use('/project-parameter', projectParameterRouter);

module.exports = router;