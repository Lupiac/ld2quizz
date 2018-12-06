const app = require('./router');

const hostname = 'localhost';
const port = 3000;

app.listen(port, hostname, function(){
    console.log("server started at " + hostname + ":" + port);
});