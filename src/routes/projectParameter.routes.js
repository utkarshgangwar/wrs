const express = require('express');
const router = express.Router();
const projectParameterController = require('../controllers/projectPrameter.controller');
const exitPoint = require('../middleware/exitPoint.middleware');
const entryPoint = require('../middleware/entryPoint.middleware');
const validate = require('../middleware/validate.middleware');
const { projectId } = require('../validators/index.validators');

router.get('/get', entryPoint, projectId, validate, projectParameterController.get, exitPoint);

module.exports = router;