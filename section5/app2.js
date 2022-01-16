//import routes file
const express = require('express');
const app = express();

//first argument of use() is path. default is '/'
app.use('/test-page', (req,res,next) => {
    console.log('test page middleware');
    res.send('<html>TEST PAGE</html>');
});

app.use((req,res,next) => {
    console.log('in the middleware');
    res.send('<html>hello from express</html>');
});

app.listen(3001)