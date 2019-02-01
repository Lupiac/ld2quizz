# lod2quiz backend

## Requirements
Main requirements are:
-   Apache couchDB
-   CouchDB-Lucene
-   A working instance of the lod2quiz API

## Installation
### Install [Apache CouchDB](https://couchdb.apache.org/)
-   Official installation document: [Installation & First-Time Setup](http://docs.couchdb.org/en/2.2.0/install/index.html)
-   Installing on Ubuntu 18.04:
```
$ sudo apt install curl
$ echo "deb https://apache.bintray.com/couchdb-deb bionic main" \ | sudo tee -a /etc/apt/sources.list
$ curl -L https://couchdb.apache.org/repo/bintray-pubkey.asc \ | sudo apt-key add -
$ sudo apt-get update && sudo apt-get install couchdb
```

### Install [CouchDB-Lucene](https://github.com/rnewson/couchdb-lucene)
1.  Follow the instructions in the section "Build and run couchdb-lucene" from [here](https://github.com/rnewson/couchdb-lucene)
    - Installing on Ubuntu 18.04:
        - Install Maven (2 or 3).
        ```
        $ sudo apt install maven
        $ mvn -version
        ```
        - checkout repository
        ```
        $ cd /home/user/folder
        $ git clone git://github.com/rnewson/couchdb-lucene.git
        ```
        - type 'mvn'
        ```
        $ cd /home/user/folder/couchdb-lucene
        $ mvn
        ```
        - cd target
        ```
        $ cd target
        ```
        - unzip couchdb-lucene-<version>.zip
        ```
        $ unzip couchdb-lucene-2.1.0-SNAPSHOT-dist.zip
        ```
        - cd couchdb-lucene-<version>
        ```
        $ cd couchdb-lucene-2.1.0-SNAPSHOT
        ```
        - ./bin/run
        ```
        $ ./bin/run
        ```

2.  Follow the instructions in the section [Configure CouchDB](https://github.com/rnewson/couchdb-lucene#configure-couchdb) only using "Proxy Handler" and not "Python hook script" (not needed). You need to add this in the local.ini file of CouchDB:
```
$ sudo vi /opt/couchdb/etc/local.ini```
```
```
[httpd_global_handlers]
_fti = {couch_httpd_proxy, handle_proxy_req, <<"http://127.0.0.1:5985">>}
```

3.  Open the file config.js and fill the different hosts and parameters like CouchDB host, CouchDB-Lucene host, generator API and the authentication header.

4.  Run the script "initDb.sh" located in the _resources_ folder of the backend project to init the database.
```
$ cd /home/user/folder/backend/resources
$ sh initDb.sh
```

In cas of any errors running the scritp, be sure CoachDB is in "Admin Party!" mode.
The script creates a first admin user with a password set as 'password'. You can change it by using PUT request on /users/admin described in "Routes" section.

## Run the lod2quiz Backend
1. Run CouchDB
    Some useful commands:
    - Stop: `$ sudo systemctl stop couchdb.service`
    - Start: `$ sudo systemctl start couchdb.service`
    - Enable: `$ sudo systemctl enable couchdb.service`
    - Check status: `$ sudo systemctl status couchdb.service`
2. Run CouchDB-Lucene
```
$ cd /home/user/folder/couchdb-lucene/target/couchdb-lucene-2.1.0-SNAPSHOT
$ ./bin/run
```
3. Install npm
```
$ sudo apt install npm
```
4. Install crypto-js module on the backend directory
```
$ cd /home/user/folder/backend
$ npm install crypto-js
```
4. Start the lod2quiz backend!
```
$ npm start
```
5. The server should be now running on _localhost:3000_
```
server started at localhost:3000
```

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

lod2quiz API is made by Oscar RODRIGUEZ ROCHA.
lod2quiz backend was created by Sébastien DEGAND and Antoine LUPIAC.
CouchDB: http://couchdb.apache.org
CouchDB-lucene: https://github.com/rnewson/couchdb-lucene
