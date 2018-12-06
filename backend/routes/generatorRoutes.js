const express = require('express')
const generatorUtils = require('../utils/generatorUtils');
const logger = require('../utils/logger');

const myRouter = express.Router();

myRouter.route('/').post(function (req, res) {
    if(req.body.domain_description == null || req.body.username == null || req.body.token == null) {
        res.statusCode = 500;
        res.json({message: "wrong body params"});
        logger.log('wrong body params');
        return;
    }
    generatorUtils.generate(req.body.domain_description, req.body.username, req.body.token).then((result) => {
        res.json(result);
        logger.log('generate quiz')
    }).catch((error) => {
        res.statusCode = error.errorCode;
        res.json({message: error.message});
        logger.log(JSON.stringify(error))
    })
});

module.exports = myRouter;