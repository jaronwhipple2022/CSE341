const express = require('express');
const bodyParser = require('body-parser');


const feedRoutes = require('./routes/feed1');
const frontend = require('./frontend/script')

const app = express();

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/feed1', feedRoutes);

//app.use('/script', frontend);

app.listen(8080);