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
    new Promise(function (resolve, reject) {
        if(req.query.keywords || req.query.taxBloom) {
            resolve(quizDbUtils.searchQuizzesByKeywords(req.query.keywords, req.query.taxBloom));
        } else {
            resolve(quizDbUtils.getAllQuizzes())
        }
    }).then((quizzes) => {
        res.json(quizzes);
        logger.log('get quizzes')
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
    quizDbUtils.getQuiz(req.params.quiz_id).then((result) => {
        res.json(result);
        logger.log('get quizzes ' + req.params.quiz_id);
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
    if(req.body.username == null || req.body.token == null) {
        res.statusCode = 500;
        res.json({message: "des identifiants sont requis en paramètre"});
        logger.log('credential params required');
        return;
    }

    new Promise(function (resolve, reject) {
        resolve(new QuizInputUser(req.body.name, req.body.image_url, req.body.questions, req.body.description, req.body.taxBloom, req.body.categories));
    }).then((quizInputUser) => {
        return quizDbUtils.updateQuiz(req.params.quiz_id, quizInputUser, req.body.username, req.body.token);
    }).then((result) => {
        res.json(result);
        logger.log('quiz updated')
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
    quizDbUtils.getQuestions(req.params.quiz_id).then((result) => {
        res.json(result);
        logger.log('get questions of quiz ' + req.params.quiz_id)
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
    quizDbUtils.getQuestion(req.params.quiz_id, req.params.question_id).then((result) => {
        res.json(result);
        logger.log('get question ' + req.params.question_id + ' of quiz ' + req.params.quiz_id)
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
    if(req.body.answer == null) {
        res.statusCode = 500;
        res.json({message: "la réponse à soumettre est manquante"});
        logger.log('no answer in response')
        return;
    }
    quizDbUtils.getCorrection(req.params.quiz_id, req.params.question_id, req.body.answer).then((result) => {
        res.json(result);
        logger.log('get correction of question' + req.params.question_id + ' of quiz ' + req.params.quiz_id);
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
    if(req.body.username == null || req.body.token == null) {
        res.statusCode = 500;
        res.json({message: "des identifiants sont requis en paramètre"});
        logger.log('credential params required');
        return;
    }

    new Promise(function (resolve, reject) {
        resolve(new QuizInputUser(req.body.name, req.body.image_url, req.body.questions, req.body.description, req.body.taxBloom, req.body.categories));
    }).then((quizInputUser) => {
        return quizDbUtils.addQuiz(quizInputUser, req.body.username, req.body.token);
    }).then((result) => {
        res.json(result);
        logger.log('add quiz')
    }).catch((error) => {
        logger.log(JSON.stringify(error))
        res.statusCode = error.errorCode;
        res.json({message: error.message});
    })

});

myRouter.route('/:quiz_id').delete(function (req, res) {
    if (req.query.username == null || req.query.token == null) {
        res.statusCode = 500;
        res.json({message: "des identifiants sont requis en paramètre"});
        logger.log('wrong body params')
        return;
    }

    quizDbUtils.deleteQuiz(req.query.username, req.query.token, req.params.quiz_id).then((result) => {
        res.json(result);
        logger.log('delete quiz ' + req.params.quiz_id);
    }).catch((error) => {
        logger.log(JSON.stringify(error))
        res.statusCode = error.errorCode;
        res.json({message: error.message});
    });
});

module.exports = myRouter;