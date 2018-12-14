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
            throw {errorCode: 500, message: "le JSON n'est pas bien formatté"}
        }
        if(name == null) {
            throw {errorCode: 500, message: 'paramètre name requis'}
        }
        if(typeof name !== 'string'){
            throw {errorCode: 500, message: "paramètre name n'est pas un string"}
        }
        if(description == null) {
            throw {errorCode: 500, message: "paramètre description requis"}
        }
        if(typeof description !== 'string'){
            throw {errorCode: 500, message: "paramètre description n'est pas un string"}
        }
        if(categories == null) {
            throw {errorCode: 500, message: "paramètre categories requis"}
        }
        if(!Array.isArray(categories)){
            throw {errorCode: 500, message: "paramètre catégories n'est pas un tableau"}
        }
        categories.forEach(function (categorie, index) {
            if(typeof categorie.name !== "string") {
                throw {errorCode: 500, message: "le nom de na catégorie n°" + index + " n'est pas un string"}
            }
            if(typeof categorie.enabled !== "boolean") {
                throw {errorCode: 500, message: "enabled de la catégories n°" + index + " n'est pas un booleen"}
            }
        });
        if(taxBloom != null) {
            if(!Array.isArray(taxBloom)) {
                throw {errorCode: 500, message: "paramètre taxBloom n'est pas un tableau"}
            }
            taxBloom.forEach(function (tax, index) {
                if(tax !== 'Connaissance' && tax !== 'Compréhension' && tax !== 'Application' && tax !== 'Analyse' && tax !== 'Synthèse' && tax !== 'Évaluation') {
                    throw {errorCode: 500, message: "taxBloom n°" + index + " n'est pas valide"}
                }
            });
        }
        if(questions == null) {
            throw {errorCode: 500, message: "paramètre questions requis"}
        }
        if(!Array.isArray(questions)){
            throw {errorCode: 500, message: "paramètre n'est pas un tableau"}
        }
        questions.forEach(function (question, index) {
            if(question.question == null) {
                throw {errorCode: 500, message: 'question requise (n° ' + index + ' )'}
            }
            if(typeof question.question !== 'string') {
                throw {errorCode: 500, message: "paramètre question n'est pas un string (n° " + index + " )"}
            }
            if(question.modifiedQuestion != null) {
                if(typeof question.modifiedQuestion !== "string") {
                    throw {errorCode: 500, message: "modifiedQuestion n'est pas un string"}
                }
            }
            if(question.answer == null) {
                throw {errorCode: 500, message: 'answer requis (n° ' + index + ' )'}
            }
            if(typeof question.answer !== 'string') {
                throw {errorCode: 500, message: "paramètre answer n'est pas un string (n° " + index + " )"}
            }
            if(question.clue == null) {
                throw {errorCode: 500, message: 'clue est requis (n° ' + index + ' )'}
            }
            if(typeof question.clue !== 'string') {
                throw {errorCode: 500, message: "paramètre clue n'est pas un string (n° " + index + " )"}
            }
            if(question.clueResource == null) {
                throw {errorCode: 500, message: 'clueResource est requis (n° ' + index + ' )'}
            }
            if(typeof question.clueResource !== 'string') {
                throw {errorCode: 500, message: "paramètre clueResource n'est pas un string (n° " + index + ' )'}
            }
            if(question.enabled == null) {
                throw {errorCode: 500, message: 'enabled est requis (n° ' + index + ' )'}
            }
            if(typeof question.enabled !== 'boolean') {
                throw {errorCode: 500, message: "paramètre enabled n'est pas un booleen (n° " + index + ' )'}
            }
            if(question.distractors == null) {
                throw {errorCode: 500, message: 'paramètre distractors est requis'}
            }
            if(!Array.isArray(question.distractors)) {
                throw {errorCode: 500, message: "paramètre distractors n'est pas un tableau (n° " + index + ' )'}
            }
            question.distractors.forEach(function (distractor, distIndex) {
                if(typeof distractor !== 'string') {
                    throw {errorCode: 500, message: 'paramètre distractor (' + distIndex + ") n'est pas un string (n° " + index + ' )'}
                }
            });
            if(question.categories == null) {
                throw {errorCode: 500, message: 'paramètre categories est requis'}
            }
            if(!Array.isArray(question.categories)) {
                throw {errorCode: 500, message: "param categories n'est pas un tableau (n° " + index + ' )'}
            }
            question.categories.forEach(function (categorie, catIndex) {
                if(typeof categorie !== 'string') {
                    throw {errorCode: 500, message: 'param categorie (' + catIndex + ") n'est pas un string (n° " + index + ' )'}
                }
            });
        });
    }

}

module.exports = QuizInputUser;
