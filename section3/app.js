// This file will create a server

// import http functionality
const http = require('http');

//create server as 'server' with callback function
const server = http.createServer((req, res) => {
    // first line will return all requests (A LOT)
    // second will return specified requests
    //console.log(req);
    console.log(req.url, req.method, req.headers);

    //send a response
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Response</title></head>');
    res.write('<body><p1> Hello from the server!</p1></body>');
    res.write('</html>');
    //tell node to end response/send to requester
    res.end();

    //this line will end the server
    //process.exit();
});

//in production you don't waant to put in a port, default is 80
// but for local reasons we will use a port.
server.listen(3000);