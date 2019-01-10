const config = require('./config');
const app = require('./router');

const hostname = config.hostname;
const port = config.port;

app.listen(port, hostname, function(){
    console.log("server started at " + hostname + ":" + port);
});
