const { body } = require('express-validator');

exports.newProject = [
    body('name').notEmpty().withMessage('Please provide name'),
    body('clientName').notEmpty().withMessage('Please provide client name'),
    body('managers').notEmpty().withMessage('Please provide managers'),
    body('startDate').notEmpty().withMessage('Please provide startDate'),
    body('closeDate').notEmpty().withMessage('Please provide closeDate'),
    body('totalSprints').notEmpty().withMessage('Please provide totalSprints'),
];

exports.newProjectParameter = [
    body('type').notEmpty().withMessage('Please provide type'),
    body('sub').notEmpty().withMessage('Please provide sub'),
];