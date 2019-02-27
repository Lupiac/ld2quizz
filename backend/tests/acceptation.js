fetch = require("node-fetch");

host = "http://localhost:3000";

token = '';
idQuiz = '';
answer = '';


scenario1 = new Promise(function(resolve) {resolve()}).then(() => {
    console.log('===============')
    console.log("SCENARIO 1");
    console.log('===============')
}).then(() => {
    return fetch(host + '/authentication', { /* connection part */
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: 'admin',
            password:'password'
        })
    })
}).then((response) => {
    return response.json()
}).then((data) => {
    console.log('Admin connects to the application with his credentials');
    if(data.token) {
        this.token = data.token;
        console.log('his token is ' + this.token);
    } else {
        console.log(data)
        throw "Authentication error";
    }
}).then(() => { /* Get quizzes part */
    console.log('Admin wants to check all quizzes');
    return fetch(host + '/quizzes');
}).then((response) => {
    return response.json();
}).then((data) => {
    if(Array.isArray(data) && data.length > 0) {
        console.log('Admin find ' + data.length + ' quizzes in the system')
        this.idQuiz = data[0].id;
    } else {
        console.log(data)
        throw "Quizzes retreive failed"
    }
}).then(() => { /* Get description of a quiz */
    console.log('Admin wants to get the description of quiz ' + this.idQuiz)
    return fetch(host + '/quizzes/' + this.idQuiz);
}).then((response) => {
    return response.json();
}).then((data) => {
    if(data.name) {
        console.log('the quiz is called ' + data.name + ' and has ' + data.nbQuestion + ' questions');
    } else {
        console.log(data)
        throw "Quiz description retreive failed"
    }
}).then(() => { /* Get a question */
    console.log('Admin wants to get the first question of the quiz');
    return fetch(host + '/quizzes/' + this.idQuiz + '/questions/0');
}).then((response) => {
    return response.json();
}).then((data) => {
    if(data.question) {
        console.log('la question est : "' + data.question + '"')
        this.answer = data.answers[0];
    } else {
        console.log(data)
        throw "retreive question failed"
    }
}).then(() => { /* Answer the question */
    console.log('Admin wants to answer the question');
    return fetch(host + '/quizzes/' + this.idQuiz + '/questions/0', { /* connection part */
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            answer: this.answer
        })
    });
}).then((response) => {
    return response.json();
}).then((data) => {
    if(data.correction) {
        console.log('Admin answers : "' + this.answer + '"');
        console.log('the answer was ' + data.correction);
    } else {
        console.log(data)
        throw "answer question failed"
    }
}).catch((error) => {
    console.log(error);
});

scenario2 = scenario1.then(() => {
    console.log('===============')
    console.log("SCENARIO 2");
    console.log('===============')
}).then(() => {
    return fetch(host + '/authentication', { /* connection part */
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: 'Admin',
            password:'wrongPassword'
        })
    })
}).then((response) => {
    return response.json()
}).then((data) => {
    console.log('Admin connects to the application with his a wrong password');
    if(data.message === 'mot de passe incorrect') {
        console.log('password was effectively wrong')
    } else {
        throw "Authentication error";
    }
}).catch((error) => {
    console.log(error)
});


scenario3 = scenario2.then(() => {
    console.log('===============')
    console.log("SCENARIO 3");
    console.log('===============')
}).then(() => {
    return fetch(host + '/authentication', { /* connection part */
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: 'admin',
            password:'password'
        })
    })
}).then((response) => {
    return response.json()
}).then((data) => {
    console.log('Admin connects to the application with his credentials');
    if(data.token) {
        this.token = data.token;
        console.log('his token is ' + this.token);
    } else {
        console.log(data)
        throw "Authentication error";
    }
}).then(() => {
    console.log('Admin wants to add a quiz');
    return fetch(host + '/quizzes', { /* connection part */
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: 'TestAcceptationQuiz',
            questions: JSON.stringify([
                {
                    question: 'une question de test ?',
                    answer: 'good answer',
                    clue: 'a clue',
                    clueResource: 'www.uriclue.test',
                    enabled: true,
                    distractors: ['wrong answer'],
                    categories: ['test', 'acceptation']
                }
            ]),
            taxBloom: JSON.stringify(['Connaissance']),
            categories: JSON.stringify([{name: "test", enabled: true}, {name: "acceptation", enabled: true}]),
            description: 'a test quiz',
            username: 'admin',
            token: this.token
        })
    })
}).then((response) => {
    return response.json();
}).then((data) => {
    if(data.message === 'quiz ajouté !') {
        console.log('le quiz a été ajouté et son id est ' + data.quizId)
    } else {
        throw "creation error"
    }
}).catch((error) => {
    console.log(error)
});
