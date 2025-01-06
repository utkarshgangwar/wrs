const express = require('express');
const router = express.Router();
const reportController = require('../controllers/report.controller');
const exitPoint = require('../middleware/exitPoint.middleware');
const entryPoint = require('../middleware/entryPoint.middleware');
const validate = require('../middleware/validate.middleware');
const { newReport, updateReport } = require('../validators/index.validators');

router.post('/new',
    entryPoint,
    newReport,
    validate,
    reportController.create,
    exitPoint
);

router.put('/update', entryPoint, reportController.update, exitPoint);
router.get('/getAll', updateReport, validate, entryPoint, reportController.getReport, exitPoint);

module.exports = router;