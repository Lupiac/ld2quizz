class QuizInputUser {

    constructor(name, image_url, questions, description, taxBloom) {
        this.check(name, image_url, JSON.parse(questions), description, JSON.parse(taxBloom));
        this.name = name;
        this.image_url = image_url;
        this.questions = JSON.parse(questions);
        let categoriesSet = new Set();
        this.questions.forEach(function (question) {
            if(question.enabled) {
                question.categories.forEach(function (categorie) {
                    categoriesSet.add(categorie);
                })
            }
        });
        this.categories = Array.from(categoriesSet)
        this.description = description;
        this.taxBloom = JSON.parse(taxBloom);
    }

    check(name, image_url, questions, description, taxBloom) {
        if(name == null) {
            throw {errorCode: 500, message: 'param name is required'}
        }
        if(typeof name !== 'string'){
            throw {errorCode: 500, message: 'param name is not a string'}
        }
        if(image_url == null) {
            throw {errorCode: 500, message: 'param image_url is required'}
        }
        if(typeof image_url !== 'string'){
            throw {errorCode: 500, message: 'param image_url is not a string'}
        }
        if(description == null) {
            throw {errorCode: 500, message: 'param description is required'}
        }
        if(typeof description !== 'string'){
            throw {errorCode: 500, message: 'param description is not a string'}
        }
        if(taxBloom == null) {
            throw {errorCode: 500, message: 'param taxBloom is required'}
        }
        if(!Array.isArray(taxBloom)){
            throw {errorCode: 500, message: 'param taxBloom is not an array'}
        }
        taxBloom.forEach(function (tax, index) {
            if(tax !== 'Connaissance' && tax !== 'Compréhension' && tax !== 'Application' && tax !== 'Analyse' && tax !== 'Synthèse' && tax !== 'Évaluation') {
                throw {errorCode: 500, message: 'taxBloom n°' + index + ' is not a valid one'}
            }
        });
        if(questions == null) {
            throw {errorCode: 500, message: 'param questions is required'}
        }
        if(!Array.isArray(questions)){
            throw {errorCode: 500, message: 'param question is not an array'}
        }
        questions.forEach(function (question, index) {
            if(question.question == null) {
                throw {errorCode: 500, message: 'question is required (question index ' + index + ' )'}
            }
            if(typeof question.question !== 'string') {
                throw {errorCode: 500, message: 'param question is not a string (question index ' + index + ' )'}
            }
            if(question.answer == null) {
                throw {errorCode: 500, message: 'answer is required (question index ' + index + ' )'}
            }
            if(typeof question.answer !== 'string') {
                throw {errorCode: 500, message: 'param answer is not a string (question index ' + index + ' )'}
            }
            if(question.clue == null) {
                throw {errorCode: 500, message: 'clue is required (question index ' + index + ' )'}
            }
            if(typeof question.clue !== 'string') {
                throw {errorCode: 500, message: 'param clue is not a string (question index ' + index + ' )'}
            }
            if(question.clueResource == null) {
                throw {errorCode: 500, message: 'clueResource is required (question index ' + index + ' )'}
            }
            if(typeof question.clueResource !== 'string') {
                throw {errorCode: 500, message: 'param clueResource is not a string (question index ' + index + ' )'}
            }
            if(question.enabled == null) {
                throw {errorCode: 500, message: 'enabled is required (question index ' + index + ' )'}
            }
            if(typeof question.enabled !== 'boolean') {
                throw {errorCode: 500, message: 'param enabled is not a boolean (question index ' + index + ' )'}
            }
            if(question.distractors == null) {
                throw {errorCode: 500, message: 'param distractors is required'}
            }
            if(!Array.isArray(question.distractors)) {
                throw {errorCode: 500, message: 'param distractors is not an array (question index ' + index + ' )'}
            }
            question.distractors.forEach(function (distractor, distIndex) {
                if(typeof distractor !== 'string') {
                    throw {errorCode: 500, message: 'param distractor (' + distIndex + ') is not a string (question index ' + index + ' )'}
                }
            });
            if(question.categories == null) {
                throw {errorCode: 500, message: 'param categories is required'}
            }
            if(!Array.isArray(question.categories)) {
                throw {errorCode: 500, message: 'param categories is not an array (question index ' + index + ' )'}
            }
            question.categories.forEach(function (categorie, catIndex) {
                if(typeof categorie !== 'string') {
                    throw {errorCode: 500, message: 'param categorie (' + catIndex + ') is not a string (question index ' + index + ' )'}
                }
            });
        });
    }

}

module.exports = QuizInputUser;