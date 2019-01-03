const express = require('express')
const generatorUtils = require('../utils/generatorUtils');
const logger = require('../utils/logger');

const myRouter = express.Router();

myRouter.route('/').post(function (req, res) {
    logger.log('requête de génération de quiz');

    if(req.body.domain_description == null || req.body.username == null || req.body.token == null) {
        res.statusCode = 500;
        res.json({message: "paramètres manquant"});
        logger.log('paramètres manquant');
        return;
    }

    logger.log('requête de génération de quiz de ' + req.body.username);

    generatorUtils.generate(req.body.domain_description, req.body.username, req.body.token).then((result) => {
        res.json(result);
        logger.log('quiz généré');
    }).catch((error) => {
        logger.log(JSON.stringify(error))
        res.statusCode = error.errorCode;
        res.json({message: error.message});
    })
});

module.exports = myRouter;
