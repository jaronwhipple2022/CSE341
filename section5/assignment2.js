const express = require('express');
const app = express();

app.use('/test-page',(req,res,next) => {
    console.log("test page found")
    res.send('<html>You did it!</html>');
});
app.use('/',(req,res,next) => {
    console.log('default middleware')
});

app.listen(5050);