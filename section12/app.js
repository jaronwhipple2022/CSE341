const path = require('path');
const cors = require('cors') // Place this with other requires (like 'path' and 'express')
//this has to be used for heroku to work i guess
const PORT = process.env.PORT || 5000;

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');

const errorController = require('./controllers/error');
const User = require('./models/user');

const MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://JaronWhipple:fDf%40R9aGyv5UrrS@cluster0.acauo.mongodb.net/nodejs"; //?retryWrites=true&w=majority";
const MONGODB_URI = "mongodb+srv://JaronWhipple:fDf%40R9aGyv5UrrS@cluster0.acauo.mongodb.net/nodejs"; //?retryWrites=true&w=majority";

const app = express();
const store = new MongoDBStore( {
  uri: MONGODB_URL,
  collection: 'sessions'
});

const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

app.use(csrfProtection);
app.use(flash());

app.use((req,res,next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use((req,res,next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
  .then(user => {
    //if no user is found app will still continue.
    if (!user) {
      return next()
    }
    req.user = user;
    next();
  })
  .catch(err => {
      next(new Error(err));
  })
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.get('/500', errorController.get500);

app.use(errorController.get404);

app.use((error, req, res, next) => {
  //res.redirect('/500');
  res.status(500).render('500', { 
    pageTitle: 'An Error Occurred.', 
    path: '/500',
    isAuthenticated: req.session.isLoggedIn });

});



const corsOptions = {
    origin: "https://<your_app_name>.herokuapp.com/",
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    family: 4
};   


mongoose
.connect( MONGODB_URL
  //'mongodb+srv://JaronWhipple:fDf%40R9aGyv5UrrS@Cluster0.acauo.mongodb.net/nodejs?retryWrites=true&w=majority'
  //MONGODB_URL
)
.then(result => {
  app.listen(PORT);
})
.catch(err => {
  console.log(err);
});