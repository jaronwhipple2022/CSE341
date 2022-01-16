//this line is no longer required
//const http = require('http');

//import routes file
const express = require('express');
// 
const app = express();

// this allows us to use a middleware function
app.use((req,res,next) => {
    console.log('in the middleware');
    // must call next or it wont move onto next middleware
    next();
});

app.use((req,res,next) => {
    console.log('in the middleware');
    //send a response
    res.send('<html>hello from express</html>');
});

// express can bypass these 2 lines with 1 line
//const server = http.createServer(app);
//server.listen(3000);
app.listen(3000)