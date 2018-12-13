class QuizInformation {

    constructor() {
    }

    constructByDbDocument(QuizInformationDocument) {
        this._id = QuizInformationDocument._id;
        this._rev = QuizInformationDocument._rev;
        this.quizId = QuizInformationDocument.quizId;
        this.name = QuizInformationDocument.name;
        this.image_url = QuizInformationDocument.image_url;
        this.nbQuestion = QuizInformationDocument.nbQuestion;
        this.description = QuizInformationDocument.description;
        this.categories = QuizInformationDocument.categories;
        this.creator = QuizInformationDocument.creator;
        this.taxBloom = QuizInformationDocument.taxBloom;
    }

    constructByInput(name, image_url, questions, description, categories, taxBloom) {
        this.name = name;
        this.image_url = image_url;
        let nbQuestion = 0;
        questions.forEach(function (question) {
            if(question.enabled) {
                nbQuestion++;
            }
        });
        this.nbQuestion = nbQuestion;
        this.description = description;
        this.categories = categories;
        this.taxBloom = taxBloom;
    }

    getUserView() {
        return {id: this._id, name: this.name, nbQuestion: this.nbQuestion, image_url: this.image_url, description: this.description, categories: this.categories, creator: this.creator, taxBloom: this.taxBloom};
    }

    getUserDocumentToInsert() {
        return {_id: this._id, name: this.name, nbQuestion: this.nbQuestion, image_url: this.image_url, description: this.description, categories: this.categories, creator: this.creator, taxBloom: this.taxBloom};
    }

    getDbDocument() {
        return {_id: this._id, _rev: this._rev, quizId: this.quizId, name: this.name, image_url: this.image_url, nbQuestion: this.nbQuestion, description: this.description, categories: this.categories, creator: this.creator, taxBloom: this.taxBloom};
    }

    getDocumentToInsert() {
        return {quizId: this.quizId, name: this.name, image_url: this.image_url, nbQuestion: this.nbQuestion, description: this.description, categories: this.categories, creator: this.creator, taxBloom: this.taxBloom};
    }
}

module.exports = QuizInformation;