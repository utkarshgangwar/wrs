const express = require('express');
const router = express.Router();
const projectRoutes = require('./project.routes');
const ping = require('./ping.routes');

router.use('/ping', ping);
router.use('/project', projectRoutes);

module.exports = router;