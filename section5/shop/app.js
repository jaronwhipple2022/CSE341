const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');


const app = express();

//this is how to use handlebars
//const expressHbs = require('express-handlebars');
//app.engine('handlebars', expressHbs());
app.set('view engine', 'ejs');
app.set('views','views');
//using pug 
//app.set lets you set variables globally
//app.set('view engine', 'pug');
//this is already the default to nav to views
//app.set('views','views');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
// this is needed to find css files and serve them STATICALLY
app.use(express.static(path.join(__dirname, 'public')));

// order matters.
app.use('/admin', adminData.routes);
app.use(shopRoutes);

//catch-all middleware 404 page not found
app.use((req,res,next) => {
  //pug implementation
  res.status(404).render('404', {pageTitle: 'Page Not Found'});
  //res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(3000);