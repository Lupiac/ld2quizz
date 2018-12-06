# Api Quizz

## Run
1. Require npm
2. `npm start`

The server starts on localhost:3000

## Routes

### Quizzes

GET /quizzes  
query parameters: keywords (optional)  
description: get information of all quizzes

POST /quizzes \
body params:
- name
- image_url
- questions [question, answer, clue, clueResource, enabled, distractors[], categories[]]
- taxBloom[] (json array of string which only accept 'Connaissance', 'Compréhension', 'Application', 'Analyse', 'Synthèse', 'Évaluation')
- description
- username
- token

description: add a quiz

GET /quizzes/:quiz_id  
description: get information of a quiz

GET /quizzes/:quiz_id/questions  
description: get questions of a quiz

GET /quizzes/:quiz_id/questions/:question_id  
description: get a question of a quiz

POST /quizzes/:quiz_id/questions/:question_id  
body params:
- answer  

description: send response and get the correction

PUT /quizzes/:quiz_id  
body params:
- name
- image_url
- questions [question, answer, clue, clueResource, enabled, distractors[], categories[]] (enabled is a boolean, if false, the question is disabled)
- taxBloom[] (json array of string which only accept 'Connaissance', 'Compréhension', 'Application', 'Analyse', 'Synthèse', 'Évaluation')
- description
- username
- token

description: update a quiz (need to have the right => be the creator of the quiz or admin)  

### Users

POST /users
body params:
- username
- password

description: create an account

POST /authentication
body params:
- username
- password

description: login to an account and get session token

DELETE /authentication
body params:
- username
- token

description: logout

GET /users/:username/quizzes?token=

query params:
- token

description: get quizzes of one user

GET /users/:username/quizzes/:quiz_id/questions?token=

query params:
- token

description: get all questions and answers of the quiz (need to have the right => be the creator of the quiz or admin) 

### Generator

POST /generator

body params:
- domain_description
- username
- token

description: generate quiz and get questions