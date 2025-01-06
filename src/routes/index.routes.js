const express = require('express');
const router = express.Router();
const projectRoutes = require('./project.routes');
const ping = require('./ping.routes');
const reportRouter = require('./report.routes');

router.use('/ping', ping);
router.use('/project', projectRoutes);
router.use('/report', reportRouter);

module.exports = router;