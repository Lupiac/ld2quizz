const express = require('express');
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/quizzes', require('./routes/quizRoutes'));
app.use('/users', require('./routes/userRoutes'));
app.use('/authentication', require('./routes/authenticationRoutes'));
app.use('/generator', require('./routes/generatorRoutes'));

module.exports = app;