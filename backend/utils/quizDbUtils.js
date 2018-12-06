const nano = require('nano')('http://localhost:5984');

const quizzesInformationDb = nano.db.use('quizzes_information');
const quizzesDb = nano.db.use('quizzes');
const userDbUtils = require('../utils/userDbUtils');

const QuizInformation = require('../models/QuizInformation');


function getAllQuizzes() {
    return quizzesInformationDb.list({include_docs: true}).then((body) => {
        let result = [];
        body.rows.forEach(function (doc) {
            const quizInformation = new QuizInformation();
            quizInformation.constructByDbDocument(doc.doc);
            result.push(quizInformation.getUserView());
        });
        return result;
    }).catch((error) => {
        console.log(error);
        throw {errorCode: 500, message: 'db problem'}
    });
}

function getQuizzesByCategorie(categories) {
    const keywordsTab = categories.split(' ');
    return quizzesInformationDb.view('searchDesignDoc', 'search-view', {keys: keywordsTab}).then((body) => {
        let result = [];
        body.rows.forEach(function (doc) {
            const quizInformation = new QuizInformation();
            quizInformation.constructByDbDocument(doc.value);
            result.push(quizInformation.getUserView());
        });
        return result;
    }).catch((error) => {
        console.log(error);
        throw {errorCode: 500, message: 'db problem'}
    });
}

function mergeQuizzes(quizzes) {
    const set = new Set();
    const result = [];
    quizzes.forEach(function(quiz) {
        if(!set.has(quiz.id) && quiz.name) {
            result.push(quiz);
            set.add(quiz.id);
        }
    })
    return result;
}

function getQuizzesByUser(username, token) {
    return userDbUtils.verifyToken(username, token).then((user) => {
        let result = [];
        user.quizzes.forEach(function (quiz) {
            const quizInformation = new QuizInformation();
            quizInformation.constructByDbDocument(quiz);
            result.push(quizInformation.getUserView());
        });
        return result;
    }).catch((error) => {
        if(error.errorCode) {
            throw {errorCode: error.errorCode, message: error.message}
        } else {
            throw {errorCode: 500, message: 'db problem'}
        }
    })
}

function getQuiz(quizInformationId) {
    return quizzesInformationDb.get(quizInformationId).then((body) => {
        const quizInformation = new QuizInformation();
        quizInformation.constructByDbDocument(body);
        return quizInformation.getUserView();
    }).catch((error) => {
        if(error.message === 'missing') {
            throw {errorCode: 404, message: "no quiz with id " + quizInformationId}
        } else {
            throw {errorCode: 500, message: 'db problem'}
        }
    });
}

function getQuestionsAnswers(quizInformationId, username, token) {
    let user;
    return userDbUtils.verifyToken(username, token).then((userResult) => {
        user = userResult;
        return quizzesInformationDb.get(quizInformationId);
    }).then((quizInformationResult) => {
        if(user.role < 3 && username !== quizInformationResult.creator) {
            throw {errorCode: 403, message: 'not allowed to see this content'};
        }
        return quizzesDb.get(quizInformationResult.quizId);
    }).then((quiz) => {
        return {questions: quiz.questions};
    }).catch((error) => {
        if(error.message === 'missing') {
            throw {errorCode: 404, message: "no quiz with id " + quizInformationId}
        } else if(error.errorCode) {
            throw {errorCode: error.errorCode, message: error.message}
        } else {
            throw {errorCode: 500, message: 'db problem'}
        }
    })
}

function getQuestions(quizInformationId) {
    return quizzesInformationDb.get(quizInformationId).then((quizInformation) => {
        return quizzesDb.get(quizInformation.quizId);
    }).then((quiz) => {
        let questions = [];
        quiz.questions.forEach(function (question) {
            if(question.enabled) {
                const answers = question.distractors;
                answers.push(question.answer);
                questions.push({
                    question: question.question,
                    answers: answers,
                    clue: question.clue,
                    clueResource: question.clueResource
                })
            }
        });
        return {questions: questions};
    }).catch((error) => {
        if(error.message === 'missing') {
            throw {errorCode: 404, message: "no quiz with id " + quizInformationId}
        } else if(error.errorCode) {
            throw {errorCode: error.errorCode, message: error.message}
        } else {
            throw {errorCode: 500, message: 'db problem'}
        }
    })

}

function getQuestion(quizInformationId, questionId) {
    let nbQuestion;
    return quizzesInformationDb.get(quizInformationId).then((quizInformation) => {
        nbQuestion = quizInformation.nbQuestion;
        return quizzesDb.get(quizInformation.quizId);
    }).then((quiz) => {
        if(questionId < nbQuestion && questionId >= 0) {
            let indexQuestion = -1;
            let indexIteration = -1;
            while (indexIteration != questionId && indexQuestion < nbQuestion) {
                indexQuestion ++;
                if(quiz.questions[indexQuestion].enabled) {
                    indexIteration++
                }
            }
            const answers = quiz.questions[indexQuestion].distractors;
            answers.push(quiz.questions[indexQuestion].answer);
            return {question: quiz.questions[indexQuestion].question, answers: answers, clue: quiz.questions[indexQuestion].clue, clueResource: quiz.questions[indexQuestion].clueResource};
        } else {
            throw {errorCode: 404, message: "no question with id " + questionId};
        }
    }).catch((error) => {
        console.log(error)
        if(error.message === 'missing') {
            throw {errorCode: 404, message: "no quiz with id " + quizInformationId}
        } else if(error.errorCode) {
            throw {errorCode: error.errorCode, message: error.message}
        } else {
            throw {errorCode: 500, message: 'db problem'}
        }
    });
}

function getCorrection(quizInformationId, questionId, userAnswer) {
    let nbQuestion
    return quizzesInformationDb.get(quizInformationId).then((quizInformation) => {
        nbQuestion = quizInformation.nbQuestion;
        return quizzesDb.get(quizInformation.quizId);
    }).then((quiz) => {
        if(questionId < nbQuestion && questionId >= 0) {
            let indexQuestion = -1;
            let indexIteration = -1;
            while (indexIteration != questionId && indexQuestion < nbQuestion) {
                indexQuestion ++;
                if(quiz.questions[indexQuestion].enabled) {
                    indexIteration++
                }
            }
            if (quiz.questions[indexQuestion].answer === userAnswer) {
                return {question: quiz.questions[indexQuestion].question, correction: 'correct', correctAnswer: quiz.questions[indexQuestion].answer, userAnswer: userAnswer};
            } else {
                return {question: quiz.questions[indexQuestion].question, correction: 'incorrect', correctAnswer: quiz.questions[indexQuestion].answer, userAnswer: userAnswer};
            }
        } else {
            throw {errorCode: 404, message: "no question with id " + questionId};
        }
    }).catch((error) => {
        if(error.message === 'missing') {
            throw {errorCode: 404, message: "no quiz with id " + quizInformationId}
        } else if(error.errorCode) {
            throw {errorCode: error.errorCode, message: error.message}
        } else {
            throw {errorCode: 500, message: 'db problem'}
        }
    });
}

function updateQuiz(quizInformationId, quiz, username, token) {
    let user;
    let quizInformation;
    let quizContent;
    return userDbUtils.verifyToken(username, token).then((userResult) => {
        user = userResult;
        return quizzesInformationDb.get(quizInformationId);
    }).then((quizInformationResult) => {
        if(user.role < 3 && username !== quizInformationResult.creator) {
            throw {errorCode: 403, message: 'not allowed to modify this quiz'};
        }
        quizInformation = new QuizInformation();
        quizInformation.constructByDbDocument(quizInformationResult);
        return quizzesDb.get(quizInformation.quizId);
    }).then((quizContentResult) => {
        quizContentResult.questions = quiz.questions;
        quizContent = quizContentResult;
        return quizzesDb.insert(quizContentResult);
    }).then(() => {
        quizInformation.constructByInput(quiz.name, quiz.image_url, quiz.questions, quiz.description, quiz.categories, quiz.taxBloom);
        return quizzesInformationDb.insert(quizInformation.getDbDocument());
    }).then(() => {
        user.quizzes.forEach(function (quizInfo, index) {
            if(quizInfo._id === quizInformation._id) {
                user.quizzes[index] = quizInformation.getUserDocumentToInsert();
            }
            return userDbUtils.updateUser(user);
        });
    }).then(() => {
        return {message: 'quiz updated !', quizId: quizInformation._id};
    }).catch((error) => {
        console.log(error);
        if(error.message === 'missing') {
            throw {errorCode: 404, message: "no quiz with id " + quizInformationId}
        } else if(error.errorCode) {
            throw {errorCode: error.errorCode, message: error.message};
        } else {
            throw {errorCode: 500, message: 'db problem'};
        }
    });
}

function addQuiz(quiz, username, token) {
    const quizInfo = new QuizInformation();
    quizInfo.constructByInput(quiz.name, quiz.image_url, quiz.questions, quiz.description,quiz.categories, quiz.taxBloom);
    let user;
    return userDbUtils.verifyToken(username, token).then((userResult) => {
        if(userResult.role < 2) {
            throw {errorCode: 403, message: 'not authorized to create quizzes'};
        }
        user = userResult;
        return quizzesDb.insert({questions: quiz.questions});
    }).then((quizResult) => {
        quizInfo.quizId = quizResult.id;
        quizInfo.creator = username;
        return quizzesInformationDb.insert(quizInfo.getDocumentToInsert());
    }).then((quizInformationResult) => {
        quizInfo._id = quizInformationResult.id;
        user.quizzes.push(quizInfo.getUserDocumentToInsert());
        return userDbUtils.updateUser(user);
    }).then(() => {
        return {message: 'quiz added !', quizId: quizInfo._id};
    }).catch((error) => {
        if(error.errorCode) {
            throw {errorCode: error.errorCode, message: error.message};
        } else {
            console.log(error);
            throw {errorCode: 500, message: 'db problem'};
        }
    });
}


module.exports = {
    getAllQuizzes,
    getQuiz,
    getQuestion,
    getCorrection,
    addQuiz,
    getQuizzesByUser,
    updateQuiz,
    getQuestionsAnswers,
    getQuestions,
    getQuizzesByCategorie,
    mergeQuizzes
}