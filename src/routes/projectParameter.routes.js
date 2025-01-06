const express = require('express');
const router = express.Router();
const projectParameterController = require('../controllers/projectParameter.controller');
const exitPoint = require('../middleware/exitPoint.middleware');
const entryPoint = require('../middleware/entryPoint.middleware');
const validate = require('../middleware/validate.middleware');
const { newProjectParameter } = require('../validators/index.validators');

router.post('/new-project-parameter',
    entryPoint,
    newProjectParameter,
    validate,
    projectParameterController.createProjectParameter,
    exitPoint
);

module.exports = router;