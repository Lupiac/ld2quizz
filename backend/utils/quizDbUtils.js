const nano = require('nano')('http://localhost:5984');
const axios = require('axios');

const quizzesInformationDb = nano.db.use('quizzes_information');
const quizzesDb = nano.db.use('quizzes');
const userDbUtils = require('../utils/userDbUtils');

const QuizInformation = require('../models/QuizInformation');


function getAllQuizzes() {
    return quizzesInformationDb.list({include_docs: true}).then((body) => {
        let result = [];
        body.rows.forEach(function (doc) {
            if(!doc.doc._id.includes('_design/')) {
                const quizInformation = new QuizInformation();
                quizInformation.constructByDbDocument(doc.doc);
                result.push(quizInformation.getUserView());
            }
        });
        return result;
    }).catch((error) => {
        console.log(error);
        throw {errorCode: 500, message: 'problème de base de données'}
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
        throw {errorCode: 500, message: 'problème de base de données'}
    });
}

function searchQuizzesByKeywords(keywords, taxBloom) {
    let params = "?q=";
    if(keywords) {
        params += 'search:"' + keywords + '"';
        if(taxBloom) {
            params += ' AND searchTaxBloom:"' + taxBloom + '"';
        }
    } else if(taxBloom) {
        params += 'searchTaxBloom:"' + taxBloom + '"';
    }
    let result = [];
    return axios.get('http://localhost:5985/local/quizzes_information/_design/luceneDesignDoc/by_name' + params).then((response) => {
        console.log(response)
        response.data.rows.forEach(function (doc) {
            result.push({
                id: doc.id,
                name: doc.fields.name,
                nbQuestion: JSON.parse(doc.fields.nbQuestion),
                image_url: doc.fields.image_url,
                description: doc.fields.description,
                categories: JSON.parse(doc.fields.categories),
                creator: doc.fields.creator,
                taxBloom: JSON.parse(doc.fields.taxBloom)
            })
        })
        return result;
    }).catch((error) => {
        console.log(error);
        throw {errorCode: 500, message:"erreur de connection à l'API de génération" }
    })

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
            throw {errorCode: 500, message: 'problème de base de données'}
        }
    })
}

function getQuiz(quizInformationId) {
    return quizzesInformationDb.get(quizInformationId).then((body) => {
        const quizInformation = new QuizInformation();
        quizInformation.constructByDbDocument(body);
        return quizInformation.getUserView();
    }).catch((error) => {
        if(error.message === 'missing' || error.message === 'deleted') {
            throw {errorCode: 404, message: "aucun quiz avec l'id " + quizInformationId}
        } else {
            throw {errorCode: 500, message: 'problème de base de données'}
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
            throw {errorCode: 403, message: "vous n'êtes pas autorisé à voir ce contenu"};
        }
        return quizzesDb.get(quizInformationResult.quizId);
    }).then((quiz) => {
        return {questions: quiz.questions};
    }).catch((error) => {
        if(error.message === 'missing' || error.message === 'deleted') {
            throw {errorCode: 404, message: "aucun quiz avec l'id " + quizInformationId}
        } else if(error.errorCode) {
            throw {errorCode: error.errorCode, message: error.message}
        } else {
            throw {errorCode: 500, message: 'problème de base de données'}
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
                let answers = question.distractors;
                answers.push(question.answer);
                answers = shuffle(answers);
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
        if(error.message === 'missing' || error.message === 'deleted') {
            throw {errorCode: 404, message: "aucun quiz avec l'id " + quizInformationId}
        } else if(error.errorCode) {
            throw {errorCode: error.errorCode, message: error.message}
        } else {
            throw {errorCode: 500, message: 'problème de base de données'}
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
            let answers = quiz.questions[indexQuestion].distractors;
            answers.push(quiz.questions[indexQuestion].answer);
            answers = shuffle(answers);
            return {question: quiz.questions[indexQuestion].question, answers: answers, clue: quiz.questions[indexQuestion].clue, clueResource: quiz.questions[indexQuestion].clueResource};
        } else {
            throw {errorCode: 404, message: "aucune question avec l'id " + questionId};
        }
    }).catch((error) => {
        console.log(error)
        if(error.message === 'missing' || error.message === 'deleted') {
            throw {errorCode: 404, message: "aucun quiz avec l'id " + quizInformationId}
        } else if(error.errorCode) {
            throw {errorCode: error.errorCode, message: error.message}
        } else {
            throw {errorCode: 500, message: 'problème de base de données'}
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
            throw {errorCode: 404, message: "aucune question avec l'id " + questionId};
        }
    }).catch((error) => {
        if(error.message === 'missing' || error.message === 'deleted') {
            throw {errorCode: 404, message: "aucun quiz avec l'id " + quizInformationId}
        } else if(error.errorCode) {
            throw {errorCode: error.errorCode, message: error.message}
        } else {
            throw {errorCode: 500, message: 'problème de base de données'}
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
            throw {errorCode: 403, message: "vous n'êtes pas autorisé à modifier ce quiz"};
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
        return {message: 'quiz mis à jour !', quizId: quizInformation._id};
    }).catch((error) => {
        console.log(error);
        if(error.message === 'missing' || error.message === 'deleted') {
            throw {errorCode: 404, message: "aucun quiz avec l'id " + quizInformationId}
        } else if(error.errorCode) {
            throw {errorCode: error.errorCode, message: error.message};
        } else {
            throw {errorCode: 500, message: 'problème de base de données'};
        }
    });
}

function addQuiz(quiz, username, token) {
    const quizInfo = new QuizInformation();
    quizInfo.constructByInput(quiz.name, quiz.image_url, quiz.questions, quiz.description,quiz.categories, quiz.taxBloom);
    let user;
    return userDbUtils.verifyToken(username, token).then((userResult) => {
        if(userResult.role < 2) {
            throw {errorCode: 403, message: "vous n'êtes pas autorisé à ajouter un quiz"};
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
        return {message: 'quiz ajouté !', quizId: quizInfo._id};
    }).catch((error) => {
        if(error.errorCode) {
            throw {errorCode: error.errorCode, message: error.message};
        } else {
            console.log(error);
            throw {errorCode: 500, message: 'problème de base de données'};
        }
    });
}

function deleteQuiz(username, token, quizToDelete) {
    let user;
    return userDbUtils.verifyToken(username, token).then((userResult) => {
        user = userResult;
        return quizzesInformationDb.get(quizToDelete);
    }).then((quizToDelete) => {
        if(user.role < 3 && username !== quizToDelete.creator) {
            throw {errorCode: 403, message: "vous n'êtes pas autorisé à supprimer ce quiz"};
        }
        return quizzesInformationDb.destroy(quizToDelete._id, quizToDelete._rev);
    }).then(() => {
        return {message: "le quiz a été supprimé"};
    }).catch((error) => {
        console.log(error);
        if(error.message === 'missing' || error.message === 'deleted') {
            throw {errorCode: 404, message: "le quiz avec l'id " + quizToDelete + " n'existe pas"}
        } else if(error.errorCode) {
            throw {errorCode: error.errorCode, message: error.message}
        } else {
            throw {errorCode: 500, message: 'problème de base de données'}
        }
    })
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
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
    mergeQuizzes,
    searchQuizzesByKeywords,
    deleteQuiz
}
