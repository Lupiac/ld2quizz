# Api Quizz

## Requirements

This API use couchDB, lucene-couchDB and the API lod2quiz.  
1. You need to install couchDB (http://docs.couchdb.org/en/2.2.0/install/index.html)  
2. a. To install lucene-couchDB, follow the instructions in section "Build and run couchdb-lucene" from this link : https://github.com/rnewson/couchdb-lucene .  
   b. Then, follow the instruction in section "Configure CouchDB" only using "Proxy Handler" and not "Python hook script" (not needed). You just need to add this in the local.ini file of couchDb:
   `[httpd_global_handlers]
    _fti = {couch_httpd_proxy, handle_proxy_req, <<"http://127.0.0.1:5985">>}`
3. Open the file config.js and fill the different hosts and parameters like couchDB host, couchDB lucene host, generator API and the authentication header.
4. Run the script initDb.sh in ./resources to init the database.

## Run
1. Require npm
2. `npm start`

The server starts on localhost:3000

## Routes

In this section you can find all routes that can be used. You can find more precisely with example of request in the file routes.txt or postman requests in resources/Quizz.postman_collection.json file.

### Quizzes

GET /quizzes  
query parameters: keywords, taxBloom (both optional)  
description: get information of all quizzes

POST /quizzes  
body params:
- name
- image_url (optional, if not the image is https://upload.wikimedia.org/wikipedia/commons/c/c5/Quizz.png)
- questions[]: [question, answer, clue, clueResource, enabled (boolean to enable or not the question during a game), distractors[], categories[]]
- taxBloom[]: json array of string which only accept 'Connaissance', 'Compréhension', 'Application', 'Analyse', 'Synthèse', 'Évaluation' (optional: if not provided, all are selected)
- description
- username
- token

description: add a quiz. Only admin account can use this route.

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
- image_url (optional, if not the image is https://upload.wikimedia.org/wikipedia/commons/c/c5/Quizz.png)
- questions[]: [question, answer, clue, clueResource, enabled (boolean to enable or not the question during a game), distractors[], categories[]]
- taxBloom[]: json array of string which only accept 'Connaissance', 'Compréhension', 'Application', 'Analyse', 'Synthèse', 'Évaluation' (optional: if not provided, all are selected)
- description
- username
- token

description: update a quiz. Only admin or the creator of the quiz can update a quiz.  

### Users

POST /users
body params:
- username
- password

description: create an account (the account is lvl 1 and so can't create quizzes)

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

PUT /users/:username (username of the updated account)  
query params:
- token (token of the account which will do the modification)
- username (account which will do the modification)
- role (optional)
- newPassword (optional)
 
description: update role or password of an account. Password can be modified by owner of the account but the role can only be update by an admin.

### Generator

POST /generator

body params:
- domain_description
- username
- token

description: generate quiz and get questions

## About

The generation API lod2quiz is made by Oscar RODRIGUEZ ROCHA.  
This backend for quiz management is made by Sébastien DEGAND and Antoine LUPIAC.  
We use CouchDB: http://couchdb.apache.org  
We use CouchDB-lucene: https://github.com/rnewson/couchdb-lucene  

