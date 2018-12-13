const express = require('express');
const userDbUtils = require('../utils/userDbUtils');
const logger = require('../utils/logger');

const myRouter = express.Router();

/*
 *  Route '/authentication'
*/

/**
 * route POST /authentication
 * Login to an account and return token
 * body params: username, password
 */
myRouter.route('/').post(function(req, res) {
    if(req.body.username == null || req.body.password == null) {
        res.statusCode = 500;
        res.json({message: "paramètres manquant"});
        logger.log('wrong body params')
        return;
    }

    userDbUtils.login(req.body.username, req.body.password).then((result) => {
        res.json(result);
        logger.log(result.message);
    }).catch((error) => {
        res.statusCode = error.errorCode;
        res.json({message: error.message});
        logger.log(JSON.stringify(error))
    })
});

/**
 * route DELETE /authentication
 * Logout to an account
 * body params: username, token
 */
myRouter.route('/').delete(function (req, res) {
    if(req.query.username == null || req.query.token == null) {
        res.statusCode = 500;
        res.json({message: "paramètres manquant"});
        logger.log('wrong body params')
        return;
    }

    userDbUtils.logout(req.query.username, req.query.token).then((result) => {
        res.json(result);
        logger.log(result.message);
    }).catch((error) => {
        res.statusCode = error.errorCode;
        res.json({message: error.message})
        logger.log(JSON.stringify(error))
    })
})

module.exports = myRouter;