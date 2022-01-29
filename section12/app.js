const path = require('path');
//this has to be used for heroku to work i guess
const PATH = process.env.PORT || 5000;

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('61f4f9db863d5d83a030b5e4')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
.connect('mongodb+srv://JaronWhipple:fDf%40R9aGyv5UrrS@Cluster0.acauo.mongodb.net/nodejs?retryWrites=true&w=majority')
.then(result => {
  User.findOne().then(user => {
    if (!user) {
      const user = new User({
        name: 'Jaron',
        email: 'jaron@test.com',
        cart: {
          items: []
        }
      });
      user.save();
    }
  });
  app.listen(PATH);
})
.catch(err => {
  console.log(err);
});