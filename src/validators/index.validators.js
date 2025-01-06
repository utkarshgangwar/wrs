const { body } = require('express-validator');

exports.newProject = [
    body('name').notEmpty().withMessage('Please provide name'),
    body('clientName').notEmpty().withMessage('Please provide client name'),
    body('managers').notEmpty().withMessage('Please provide managers'),
    body('startDate').notEmpty().withMessage('Please provide startDate'),
    body('closeDate').notEmpty().withMessage('Please provide closeDate'),
    body('totalSprints').notEmpty().withMessage('Please provide totalSprints'),
];

exports.newReport = [
    body('projectId').notEmpty().withMessage('Please provide project id'),
    body('description').notEmpty().withMessage('Please provide description'),
];

exports.updateReport = [
    body('doc_id').notEmpty().withMessage('Please provide the doc _id')
]

exports.getProjectReport = [
    body('projectId').notEmpty().withMessage('Please provide the project Id')
]