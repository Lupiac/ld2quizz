# lod2quiz backend and frontend

## lod2quiz
The lod2quiz project aims to provide and online quiz platform for educational purposes.

Pedagogical quizzes are a powerful and popular tool for evaluating and improve learner's knowledge about a specific topic in an informal and entertaining way. However, their generation is a complex task that is time-consuming and usually it has to be performed by domain experts.

lod2quiz is an implementation of the following research works:
-   Automatic Generation of Quizzes from DBpedia Accordingto Educational Standards: ​[HAL] (https://hal.inria.fr/hal-01758737)
- ​  Extraction of Relevant Resources and Questions from DBpedia to Automatically Generate Quizzes on Specific Domains​: ​​[HAL](https://hal.inria.fr/hal-01811490)

Currently, lod2quiz allows to automatically generate quizzes about a specific topic through a REST API. That is, it provides routes for generating a quiz from a text written in natural language. The resulting quizzes are in the form of questions with a correct answer as well as a set of distractors.

## This project
This project completes the lod2quiz implementation, by accessing the lod2quiz API, it mainly provides a web application (with a backend and a frontend) that allows:
-   a **_quiz creator_** to **generate** automatically a quiz from a given domain expressed in natural language and **curate** the resulting questions through the web interface. Curation improves precision of the questions in the generated quiz.
-   a **_quiz player_** to take the generated quizzes (and track its progress if having an account)

## About
This project has been designed, developed and tested by:
- Sébastien DEGAND
- Antoine LUPIAC

Under the supervision of Oscar RODRÍGUEZ ROCHA.
