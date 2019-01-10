const hostname = 'localhost'; // hostname of this backend
const port = 3000; // port of this backend
const couchdbHost = 'http://localhost:5984';
const couchdbLuceneHost = 'http://localhost:5985';
const quizGeneratorHost = 'http://51.77.145.11/lod2quiz/api/v1';
const authorizationHeaderGenerator = 'Basic YXBpYWNjZXNzOmhkcURWVEhiUzdxanVzN1Q=';

exports.couchdbHost = couchdbHost;
exports.couchdbLuceneHost = couchdbLuceneHost;
exports.quizGeneratorHost = quizGeneratorHost;
exports.authorizationHeaderGenerator = authorizationHeaderGenerator;
exports.hostname = hostname;
exports.port = port;
