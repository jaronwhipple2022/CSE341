const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login', authController.postLogin);

router.post('/signup', authController.postSignup);

router.post('/logout', authController.postLogout);


module.exports = router;

//'mongodb+srv://JaronWhipple:fDf%40R9aGyv5UrrS@Cluster0.acauo.mongodb.net/nodejs?retryWrites=true&w=majority'