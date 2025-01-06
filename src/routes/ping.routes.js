const express = require('express');
const router = express.Router();
const entryPoint = require('../middleware/entryPoint.middleware');
const exitPoint = require('../middleware/exitPoint.middleware');

router.get(
    '/',
    entryPoint,
    (req, res, next) => {
        req.apiStatus = {
            isSuccess: true,
            data: 'pong'
        }
        next();
    },
    exitPoint
);

module.exports = router;
