//import http module
const http = require('http');

//create server, start server and begin loop
const server = http.createServer((req, res) => {
  //parse url
  const url = req.url;

  // check both cases first case in address bar
  if (url === '/') {
    // tell browser you will send html by setting header
    res.setHeader('Content-Type', 'text/html');
    // respond with simple html hard coded.
    res.write('<html>');
    res.write('<head><title>Assignment 1</title></head>');
    //create form for user to fill out
    res.write(
      '<body><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send</button></form></body>'
    );
    res.write('</html>');
    // need to return because there are more res to be executed
    return res.end();
  }
  // check for second case in address bar
  if (url === '/users') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Assignment 1</title></head>');
    //hard coded user names
    res.write('<body><ul><li>User 1</li><li>User 2</li></ul></body>');
    res.write('</html>');
    return res.end();
  }
  // Send response with error msg "page not found"
  if (url === '/create-user') {
    //create array to store chunks
    const body = [];

    //executes on ever chunk of data recieved
    req.on('data', chunk => {
      //add chunk to body
      body.push(chunk);
    });
    //convert data to string
    req.on('end', () => {
      //create one buffer of all chunks .toString
      const parsedBody = Buffer.concat(body).toString();
      //this would be 'username= *input*'
      //console.log(parsedBody);
      //this will get rid of 'username='
      console.log(parsedBody.split('=')[1]);
    });

    //redirect and give response
    res.statusCode = 302;
    res.setHeader('Location', '/');
    res.end();
  }
});

//use localhost
server.listen(3000);