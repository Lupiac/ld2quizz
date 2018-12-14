class QuizInputUser {

    constructor(name, image_url, questions, description, taxBloom, categories) {
        this.check(name, image_url, questions, description, taxBloom, categories);
        this.name = name;
        if(image_url == null || image_url === "") {
            image_url = 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Quizz.png';
        }
        this.image_url = image_url;
        this.questions = JSON.parse(questions);
        this.categories = JSON.parse(categories);
        this.description = description;
        if(taxBloom == null || JSON.parse(taxBloom).length == 0) {
            this.taxBloom = ['Connaissance', 'Compréhension', 'Application', 'Analyse', 'Synthèse', 'Évaluation'];
        } else {
            this.taxBloom = JSON.parse(taxBloom);
        }
    }

    check(name, image_url, questions, description, taxBloom, categories) {
        try {
            questions = JSON.parse(questions);
            taxBloom = JSON.parse(taxBloom);
            categories = JSON.parse(categories);
        }catch (e) {
            throw {errorCode: 500, message: 'Json format not well formed (questions or taxBloom)'}
        }
        if(name == null) {
            throw {errorCode: 500, message: 'param name is required'}
        }
        if(typeof name !== 'string'){
            throw {errorCode: 500, message: 'param name is not a string'}
        }
        if(description == null) {
            throw {errorCode: 500, message: 'param description is required'}
        }
        if(typeof description !== 'string'){
            throw {errorCode: 500, message: 'param description is not a string'}
        }
        if(categories == null) {
            throw {errorCode: 500, message: 'param categories is required'}
        }
        if(!Array.isArray(categories)){
            throw {errorCode: 500, message: 'param categories is not an array'}
        }
        categories.forEach(function (categorie, index) {
            if(typeof categorie.name !== "string") {
                throw {errorCode: 500, message: 'categorie name n°' + index + ' is not a string'}
            }
            if(typeof categorie.enabled !== "boolean") {
                throw {errorCode: 500, message: 'categorie enabled n°' + index + ' is not a boolean'}
            }
        });
        if(taxBloom != null) {
            if(!Array.isArray(taxBloom)) {
                throw {errorCode: 500, message: 'param taxBloom is not an array'}
            }
            taxBloom.forEach(function (tax, index) {
                if(tax !== 'Connaissance' && tax !== 'Compréhension' && tax !== 'Application' && tax !== 'Analyse' && tax !== 'Synthèse' && tax !== 'Évaluation') {
                    throw {errorCode: 500, message: 'taxBloom n°' + index + ' is not a valid one'}
                }
            });
        }
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
            if(question.modifiedQuestion != null) {
                if(typeof question.modifiedQuestion !== "string") {
                    throw {errorCode: 500, message: 'modifiedQuestion must be a string'}
                }
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
