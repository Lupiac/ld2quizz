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
    logger.log('requête de création de compte');

    if (req.body.username == null || req.body.password == null) {
        res.statusCode = 500;
        res.json({message: "des identifiants sont requis en paramètre"});
        logger.log('des identifiants sont requis en paramètre')
        return;
    }

    userDbUtils.addUser(req.body.username, req.body.password).then((result) => {
        res.json(result)
        logger.log('utilisateur ' + req.body.username + ' ajouté');
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
    logger.log('requête de récuperation des quiz de ' + req.params.username)

    if (req.query.token == null) {
        res.statusCode = 500;
        res.json({message: "le jeton de connection est requis"});
        logger.log('le jeton de connection est requis')
        return;
    }

    quizzesDbUtils.getQuizzesByUser(req.params.username, req.query.token).then((result) => {
        res.json(result);
        logger.log('quiz récupéré');
    }).catch((error) => {
        logger.log(JSON.stringify(error))
        res.statusCode = error.errorCode;
        res.json({message: error.message});
    })
});

myRouter.route('/:username').put(function (req, res) {
    logger.log('requête de modification des paramètres utilisateur de ' + req.body.username);

    if (req.body.username == null || req.body.token == null || (req.body.role == null && req.body.newPassword == null) || isNaN(req.body.role)) { // need to have role or passwords or both
        res.statusCode = 500;
        res.json({message: "paramètres manquant"});
        logger.log('paramètres manquant')
        return;
    }
    userDbUtils.updateUserInformation(req.body.username, req.body.token, req.params.username, parseInt(req.body.role), req.body.oldPassword, req.body.newPassword).then((result) => {
        res.json(result);
        logger.log('utilisateur ' + req.body.username + ' mis à jour');
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
    logger.log('requête de récuperation du schéma des questions du quiz ' + req.params.quiz_id)

    if (req.query.token == null) {
        res.statusCode = 500;
        res.json({message: "le jeton de connection est requis"});
        logger.log('le jeton de connection est requis')
        return;
    }

    quizzesDbUtils.getQuestionsAnswers(req.params.quiz_id, req.params.username, req.query.token).then((result) => {
        res.json(result);
        logger.log('schéma des questions et réponses récupéré');
    }).catch((error) => {
        logger.log(JSON.stringify(error))
        res.statusCode = error.errorCode;
        res.json({message: error.message});
    });
});

myRouter.route('/:username/').delete(function (req, res) {
    logger.log("requête de suppression de l'utilisateur " + req.query.username);

    if (req.query.username == null || req.query.token == null) {
        res.statusCode = 500;
        res.json({message: "des identifiants sont requis en paramètre"});
        logger.log('des identifiants sont requis en paramètre')
        return;
    }

    userDbUtils.deleteUser(req.query.username, req.query.token, req.params.username).then((result) => {
        res.json(result);
        logger.log('utilisateur ' + req.params.username + ' supprimé');
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
