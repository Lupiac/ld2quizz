const express = require('express')
const quizDbUtils = require('../utils/quizDbUtils');
const logger = require('../utils/logger');

const QuizInputUser = require('../models/QuizInputUser');

const myRouter = express.Router();

/*
 *  Route '/quizzes'
*/

/**
 * route GET /quizzes
 * Get information of all quizzes
 */
myRouter.route('/').get(function(req, res) {
    logger.log('requête de récupération de quiz');

    new Promise(function (resolve, reject) {
        if(req.query.keywords || req.query.taxBloom) {
            resolve(quizDbUtils.searchQuizzesByKeywords(req.query.keywords, req.query.taxBloom));
        } else {
            resolve(quizDbUtils.getAllQuizzes())
        }
    }).then((quizzes) => {
        res.json(quizzes);
        logger.log('quiz récupéré')
    }).catch((error) => {
        res.statusCode = error.errorCode;
        res.json({message: error.message});
        logger.log(JSON.stringify(error))
    })
});

/**
 * route GET /quizzes/:quiz_id
 * Get information of a quiz
 * params: quiz_id
 */
myRouter.route('/:quiz_id').get(function (req, res) {
    logger.log("requête de récupération du détail du quiz " + req.params.quiz_id);

    quizDbUtils.getQuiz(req.params.quiz_id).then((result) => {
        res.json(result);
        logger.log('quiz ' + req.params.quiz_id + ' récupéré')
    }).catch((error) => {
        res.statusCode = error.errorCode;
        res.json({message: error.message});
        logger.log(JSON.stringify(error))
    })
});

/**
 * route PUT /quizzes/:quiz_id
 * Update a quiz
 * params: quiz_id
 * body params: username, token, (name, image_url, questions, description, categories) => quiz info
 */
myRouter.route('/:quiz_id').put(function (req, res) {
    logger.log("requête de modification du quiz " + req.params.quiz_id);

    if(req.body.username == null || req.body.token == null) {
        res.statusCode = 500;
        res.json({message: "des identifiants sont requis en paramètre"});
        logger.log('des identifiants sont requis en paramètre');
        return;
    }

    logger.log("requête de modification du quiz " + req.params.quiz_id + " de " + req.body.username);

    new Promise(function (resolve, reject) {
        resolve(new QuizInputUser(req.body.name, req.body.image_url, req.body.questions, req.body.description, req.body.taxBloom, req.body.categories));
    }).then((quizInputUser) => {
        return quizDbUtils.updateQuiz(req.params.quiz_id, quizInputUser, req.body.username, req.body.token);
    }).then((result) => {
        res.json(result);
        logger.log('quiz ' + req.params.quiz_id + ' modifié')
    }).catch((error) => {
        console.log(error)
        res.statusCode = error.errorCode;
        res.json({message: error.message});
        logger.log(JSON.stringify(error))
    })
});

/**
 * route GET /quizzes/:quiz_id/questions
 * Get all questions of the quiz with all possible answer (we don't specify the correct one)
 * params: quiz_id
 */
myRouter.route('/:quiz_id/questions').get(function (req, res) {
    logger.log('requête de récuperation des questions du quiz ' + req.params.quiz_id)

    quizDbUtils.getQuestions(req.params.quiz_id).then((result) => {
        res.json(result);
        logger.log('questions du quiz ' + req.params.quiz_id + ' récupéré')
    }).catch((error) => {
        res.statusCode = error.errorCode;
        res.json({message: error.message});
        logger.log(JSON.stringify(error))
    })
});

/**
 * route GET /quizzes/:quiz_id/questions/:question_id
 * Get a question with possible answer (we don't specify the correct one)
 * params: quiz_id, question_id
 */
myRouter.route('/:quiz_id/questions/:question_id').get(function (req, res) {
    logger.log('requête de la question ' + req.params.question_id + ' du quiz ' + req.params.quiz_id)

    quizDbUtils.getQuestion(req.params.quiz_id, req.params.question_id).then((result) => {
        res.json(result);
        logger.log('question ' + req.params.question_id + ' du quiz ' + req.params.quiz_id + ' récupéré')
    }).catch((error) => {
        res.statusCode = error.errorCode;
        res.json({message: error.message});
        logger.log(JSON.stringify(error))
    })
});

/**
 * route POST /quizzes/:quiz_id/questions/:question_id
 * Submit answer and return if it's correct
 * params: quiz_id, question_id
 * body params: answer
 */
myRouter.route('/:quiz_id/questions/:question_id').post(function (req, res) {
    logger.log('requête de correction de la réponse à la question ' + req.params.question_id + ' du quiz ' + req.params.quiz_id);

    if(req.body.answer == null) {
        res.statusCode = 500;
        res.json({message: "la réponse à soumettre est manquante"});
        logger.log('la réponse à soumettre est manquante')
        return;
    }
    quizDbUtils.getCorrection(req.params.quiz_id, req.params.question_id, req.body.answer).then((result) => {
        res.json(result);
        logger.log('correction de la question ' + req.params.question_id + ' du quiz ' + req.params.quiz_id + ' récupéré');
    }).catch((error) => {
        res.statusCode = error.errorCode;
        res.json({message: error.message});
        logger.log(JSON.stringify(error))
    })
});

/**
 * route POST /quizzes
 * add a quiz
 * body params: username, token, name, image_url, questions, description, categories
 */
myRouter.route('/').post(function(req, res) {
    logger.log("requête d'ajout d'un quiz")

    if(req.body.username == null || req.body.token == null) {
        res.statusCode = 500;
        res.json({message: "des identifiants sont requis en paramètre"});
        logger.log('des identifiants sont requis en paramètre');
        return;
    }

    new Promise(function (resolve, reject) {
        resolve(new QuizInputUser(req.body.name, req.body.image_url, req.body.questions, req.body.description, req.body.taxBloom, req.body.categories));
    }).then((quizInputUser) => {
        return quizDbUtils.addQuiz(quizInputUser, req.body.username, req.body.token);
    }).then((result) => {
        res.json(result);
        logger.log('quiz ajouté')
    }).catch((error) => {
        logger.log(JSON.stringify(error))
        res.statusCode = error.errorCode;
        res.json({message: error.message});
    })

});

/**
 * route DELETE /quizzes/:quiz_id
 * delete a quiz
 * body params: username, token
 */
myRouter.route('/:quiz_id').delete(function (req, res) {
    logger.log('requête de suppression du quiz ' + req.params.quiz_id);

    if (req.query.username == null || req.query.token == null) {
        res.statusCode = 500;
        res.json({message: "des identifiants sont requis en paramètre"});
        logger.log('des identifiants sont requis en paramètre')
        return;
    }

    quizDbUtils.deleteQuiz(req.query.username, req.query.token, req.params.quiz_id).then((result) => {
        res.json(result);
        logger.log('quiz' + req.params.quiz_id + ' supprimé');
    }).catch((error) => {
        logger.log(JSON.stringify(error))
        res.statusCode = error.errorCode;
        res.json({message: error.message});
    });
});

module.exports = myRouter;
