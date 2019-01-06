#!/bin/sh

curl -X DELETE http://127.0.0.1:5984/quizzes/
curl -X DELETE http://127.0.0.1:5984/quizzes_information/
curl -X DELETE http://127.0.0.1:5984/users/

curl -X PUT http://127.0.0.1:5984/_global_changes
curl -X PUT http://127.0.0.1:5984/_replicator
curl -X PUT http://127.0.0.1:5984/_users

curl -X PUT http://127.0.0.1:5984/quizzes
curl -X PUT http://127.0.0.1:5984/quizzes_information
curl -X PUT http://127.0.0.1:5984/users
curl -X PUT http://127.0.0.1:5984/generator

curl -X PUT --data @generatorDoc.json 'http://localhost:5984/generator/id_graph'

curl -X PUT --data @luceneDoc.json 'http://localhost:5984/quizzes_information/_design/luceneDesignDoc'

curl -X PUT --data @adminUserDoc.json 'http://localhost:5984/users/admin'
