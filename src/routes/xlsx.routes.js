const express = require('express');
const router = express.Router();
const XlsxTimesheet = require('../xlsx/timesheet');
const XlsxProjectHealth = require('../xlsx/projectHealth');
// const exitPoint = require('../middleware/exitPoint.middleware');
// const entryPoint = require('../middleware/entryPoint.middleware');

router.get('/timesheet', XlsxTimesheet.download);
router.get('/project-health', XlsxProjectHealth.download);

module.exports = router;