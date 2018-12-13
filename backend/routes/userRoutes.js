const express = require('express');
const userDbUtils = require('../utils/userDbUtils');
const quizzesDbUtils = require('../utils/quizDbUtils');
const logger = require('../utils/logger');

const myRouter = express.Router();

/*
 *  Route '/users'
*/

/**
 * route POST /users
 * Create account
 * body params: username, password
 */
myRouter.route('/').post(function (req, res) {
    if (req.body.username == null || req.body.password == null) {
        res.statusCode = 500;
        res.json({message: "des identifiants sont requis en paramètre"});
        logger.log('wrong body params')
        return;
    }

    userDbUtils.addUser(req.body.username, req.body.password).then((result) => {
        res.json(result)
        logger.log('add user ' + req.body.username);
    }).catch((error) => {
        logger.log(JSON.stringify(error))
        res.statusCode = error.errorCode;
        res.json({message: error.message});
    })
});

/**
 * route GET /users/:username/quizzes?token=
 * Get quizzes by user
 * params: username
 * query params: token
 */
myRouter.route('/:username/quizzes').get(function (req, res) {
    if (req.query.token == null) {
        res.statusCode = 500;
        res.json({message: "le jeton de connection est requis"});
        logger.log('wrong body params')
        return;
    }

    quizzesDbUtils.getQuizzesByUser(req.params.username, req.query.token).then((result) => {
        res.json(result);
        logger.log('get user quizzes');
    }).catch((error) => {
        logger.log(JSON.stringify(error))
        res.statusCode = error.errorCode;
        res.json({message: error.message});
    })
});

myRouter.route('/:username').put(function (req, res) {
    if (req.body.username == null || req.body.token == null || (req.body.role == null && req.body.newPassword == null) || isNaN(req.body.role)) { // need to have role or passwords or both
        res.statusCode = 500;
        res.json({message: "paramètres manquant"});
        logger.log('wrong body params')
        return;
    }
    userDbUtils.updateUserInformation(req.body.username, req.body.token, req.params.username, parseInt(req.body.role), req.body.oldPassword, req.body.newPassword).then((result) => {
        res.json(result);
        logger.log('update role');
    }).catch((error) => {
        logger.log(JSON.stringify(error))
        res.statusCode = error.errorCode;
        res.json({message: error.message});
    })
})

/**
 * route GET /users/:username/quizzes/:quiz_id/questions?token=
 * Get all question in a quiz with the correct answer and distractors
 * params: username, quiz_id
 * query params: token
 */
myRouter.route('/:username/quizzes/:quiz_id/questions').get(function (req, res) {
    if (req.query.token == null) {
        res.statusCode = 500;
        res.json({message: "le jeton de connection est requis"});
        logger.log('wrong body params')
        return;
    }

    quizzesDbUtils.getQuestionsAnswers(req.params.quiz_id, req.params.username, req.query.token).then((result) => {
        res.json(result);
        logger.log('get questions and answers');
    }).catch((error) => {
        logger.log(JSON.stringify(error))
        res.statusCode = error.errorCode;
        res.json({message: error.message});
    });
});

myRouter.route('/:username/').delete(function (req, res) {
    if (req.query.username == null || req.query.token == null) {
        res.statusCode = 500;
        res.json({message: "des identifiants sont requis en paramètre"});
        logger.log('wrong body params')
        return;
    }

    userDbUtils.deleteUser(req.query.username, req.query.token, req.params.username).then((result) => {
        res.json(result);
        logger.log('delete user ' + req.params.username);
    }).catch((error) => {
        logger.log(JSON.stringify(error))
        res.statusCode = error.errorCode;
        res.json({message: error.message});
    });
});

myRouter.route('/:username/quizzes/:quiz_id').get(function (req, res) {
    // route to get state of an user on the quiz

})

// creer user

// login (return token)

// verify token

/*
- user's access (creator, admin, player)
- quiz list that user own
- state of quizzes pending
 */

module.exports = myRouter;