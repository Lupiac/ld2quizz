const nano = require('nano')('http://localhost:5984');
//const generatorDb = nano.db.use('generator');

const axios = require('axios');
const userDbUtils = require('../utils/userDbUtils');
const fs = require("fs");

function generate(domain_description, username, token) {
    let id_graph_value;
    return userDbUtils.verifyToken(username, token).then((user) => {
        //return generatorDb.get('id_graph');
        return 1;
    }).then((id_graph) => {
        //id_graph_value = id_graph.value;
        //id_graph.value = id_graph.value + 1;
        //return generatorDb.insert(id_graph);
        return 1;
    }).then(() => {
        /*return axios.post('http://127.0.0.1:5002/subgraph', {
            named_graph: 'http://ld2quiz.ai/quiz/' + id_graph_value,
            domain_description: domain_description
        });*/
    }).then(() => {
        /*return axios.get('http://127.0.0.1:5002/quiz', {
            named_graph: 'http://ld2quiz.ai/quiz/' + id_graph_value
        })*/
        const content = fs.readFileSync(process.cwd() + '/models/api.json');
        return JSON.parse(content);
    }).then((response) => {
        let questions = [];
        let categoriesSet = new Set();
        response.quiz.forEach(function (question) {
            let distractors = [];
            question.distractors.forEach(function (distractor) {
                distractors.push(distractor.Label);
            });
            let categories = [];
            question.categories.forEach(function (categorie) {
                const tab = categorie.split(':');
                categories.push(tab[tab.length-1]);
                categoriesSet.add(tab[tab.length-1]);
            });
            questions.push({question: question.question, answer:question.answer, distractors: distractors, categories: categories, clue: question.answer_abstract, clueResource: question.answer_resource, enabled: true})
        });
        return {questions: questions, categories: Array.from(categoriesSet)};
    }).catch((error) => {
        if(error.errorCode) {
            throw {errorCode: error.errorCode, message: error.message}
        } else {
            console.log(error);
            throw {errorCode: 500, message: 'http error'};
        }
    })
}

module.exports = {
    generate
};