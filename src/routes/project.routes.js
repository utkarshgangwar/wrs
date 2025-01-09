const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');
const exitPoint = require('../middleware/exitPoint.middleware');
const entryPoint = require('../middleware/entryPoint.middleware');
const validate = require('../middleware/validate.middleware');
const { newProject, projectId } = require('../validators/index.validators');

router.post('/new', entryPoint, newProject, validate, projectController.newProject, exitPoint);
router.get('/get-all', entryPoint, projectController.getAll, exitPoint);
router.put('/updateById', entryPoint, projectId, validate, projectController.updateById, exitPoint);

module.exports = router;