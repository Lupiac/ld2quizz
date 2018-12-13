const nano = require('nano')('http://localhost:5984');
const generatorDb = nano.db.use('generator');

const axios = require('axios');
const userDbUtils = require('../utils/userDbUtils');

function generate(domain_description, username, token, trynumber = 0) {
    if(trynumber > 2) {
        throw {errorCode: 500, message: 'la génération a pris trop de temps, réessayez plus tard'}
    }
    let id_graph_value;
    return userDbUtils.verifyToken(username, token).then((user) => {
        // get id graph for generation
        return generatorDb.get('id_graph');
    }).then((id_graph) => {
        // increment id graph
        id_graph_value = id_graph.value;
        id_graph.value = id_graph.value + 1;
        return generatorDb.insert(id_graph);
    }).then(() => {
        // generate graph from domain
        return axios.post('http://51.77.145.11/lod2quiz/api/v1/subgraph?named_graph=http://lod2quiz.ai/quiz/' + id_graph_value + '&domain_description=' + domain_description, {}, {
            headers: {
                Authorization: 'Basic YXBpYWNjZXNzOmhkcURWVEhiUzdxanVzN1Q='
            }
        });
    }).then(() => {
        // get quiz from graph
        return axios.get('http://51.77.145.11/lod2quiz/api/v1/quiz?named_graph=http://lod2quiz.ai/quiz/' + id_graph_value, {
            headers: {
                Authorization: 'Basic YXBpYWNjZXNzOmhkcURWVEhiUzdxanVzN1Q='
            }
        })
    }).then((response) => {
        // format quiz

        let questions = [];
        let categoriesSet = new Set();
        response.data.quiz.forEach(function (question) {
            let distractors = [];
            question.distractors.forEach(function (distractor) {
                distractors.push(distractor.Label);
            });
            let categories = [];
            question.categories.forEach(function (categorie) {
                const tab = categorie.split(':');
                categories.push(tab[tab.length-1].replace(/_/g, ' '));
                categoriesSet.add(tab[tab.length-1].replace(/_/g, ' '));
            });
            questions.push({question: question.question, answer:question.answer, distractors: distractors, categories: categories, clue: question.answer_abstract, clueResource: question.answer_resource, enabled: true})
        });
        return {questions: questions, categories: Array.from(categoriesSet)};
    }).catch((error) => {
        console.log(error);
        if(error.response && error.response.data.message === 'No DBpedia resource was found in provided text') {
            throw {errorCode: 500, message: 'Aucune donnée DBpedia a été trouvé à partir du text qui a été soumis'}
        }
        if(error.response && error.response.statusText === 'Proxy Error') {
            return generate(domain_description, username, token, trynumber+1);
        }
        if(error.errorCode) {
            throw {errorCode: error.errorCode, message: error.message}
        } else {
            throw {errorCode: 500, message: 'erreur interne'};
        }
    })
}

module.exports = {
    generate
};