// Same file, but with parsing the requests

const http = require('http');

//import routes file
const routes = required('./routes');

const server = http.createServer(routes);

server.listen(3000);