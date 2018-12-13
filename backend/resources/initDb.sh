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


# curl -X PUT http://127.0.0.1:5984/quizzes/266517d7884aff7a3a84cbb83d002b31 -d '{"questions": [{"question": "2+2 ?","answer": "4","distractors": ["22","8","2"]},{"question": "3*3 ?","answer": "9","distractors": ["33","6","13"]}]}'
# curl -H "Content-Type: application/json" -X POST http://127.0.0.1:5984/quizzes_information/ -d '{"quizId": "266517d7884aff7a3a84cbb83d002b31","name": "maths", "image_url": "https://upload.wikimedia.org/wikipedia/commons/c/c5/Quizz.png","nbQuestion": 2, "description": "un quizz de mathèmatiques", "domains": ["mathèmatiques", "arithmetique"]}'

# curl -X PUT http://127.0.0.1:5984/quizzes/6edf076ff16ebbda69c1931946009e2c -d '{"questions": [{"question": "En quelle année le premier homme a marché sur la lune ?","answer": "1969","distractors": ["2000","1979","1993"]},{"question": "Qui a marché pour la première fois sur la lune ?","answer": "Neil Armstrong","distractors": ["Thomas Pesquet","Harrison Schmitt","Alan Shepard"]}]}'
# curl -H "Content-Type: application/json" -X POST http://127.0.0.1:5984/quizzes_information/ -d '{"quizId": "6edf076ff16ebbda69c1931946009e2c","name": "Mission Apollo", "image_url": "https://upload.wikimedia.org/wikipedia/commons/9/9c/Aldrin_Apollo_11.jpg","nbQuestion": 2, "description": "un quizz sur la mission Apollo", "domains": ["espace", "apollo"]}'

curl -X PUT --data @generatorDoc.json 'http://localhost:5984/generator/id_graph'

# curl -X PUT --data @searchView.json 'http://localhost:5984/quizzes_information/_design/searchDesignDoc'

# curl -X PUT --data @luceneDoc.json 'http://localhost:5984/quizzes_information/_design/luceneDesignDoc'

curl -X PUT --data @adminUserDoc.json 'http://localhost:5984/users/admin'