const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');
const exitPoint = require('../middleware/exitPoint.middleware');
const entryPoint = require('../middleware/entryPoint.middleware');
const validate = require('../middleware/validate.middleware');
const { newProject, getProjectReport } = require('../validators/index.validators');

router.post('/new-project', entryPoint, newProject, validate, projectController.newProject, exitPoint);
router.get('/get-report', entryPoint, getProjectReport, validate, projectController.getReport, exitPoint);

module.exports = router;