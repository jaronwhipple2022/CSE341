//this file connects exports and is used in app3.js

const fs = require('fs');
const { resourceLimits } = require('worker_threads');

const requestHandler = (req, res) => {

    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter Message</title><head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
      }
      if (url === '/message' && method === 'POST') {
        // this array will hold all data given.
        const body = [];
        //listen for events..execute for every incoming data piece
        req.on('data', (chunk) => {
          console.log(chunk);
          //add chunk (data) to body
          body.push(chunk);
        });
        // this function waits for end
        req.on('end', () => {
          //we know we will receive key value pairs back "message=etc..."
          const parsedBody = Buffer.concat(body).toString();
          // split key-value pair
          const message = parsedBody.split('=')[1];
    
          // written this way execution is paused until file is written
          //fs.writeFileSync('message.txt', message);
          // this is the way that should be used:
          fs.writeFile('message.txt', message, (err) => {
            // * no error response written at the time *
            res.statusCode = 302;
            res.setHeader('Location', '/');
            return res.end();
          });
        });
      }
      res.setHeader('Content-Type', 'text/html');
      res.write('<html>');
      res.write('<head><title>My First Page</title><head>');
      res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
      res.write('</html>');
      res.end();
};

//one way to export
module.exports = requestHandler;

//a way to export many things
//module.exports = {
//    handler: requestHandler,
//    someText: 'some hard coded text'
//};

//ta access multiple on the other file:
//resourceLimits.handler or resourceLimits.someText