const express = require('express');
const { check, body } = require('express-validator');

const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login',
    // [
    //     body('email').isEmail()
    //     .withMessage('Please enter a valid email.')
    //     .normalizeEmail(),
    //     body('password').isLength({min: 8})
    //     .withMessage('Invalid password')
    //     .trim()
    // ],
    authController.postLogin);

router.post('/signup',
[ 
    check('email').isEmail()
    .withMessage('Please enter a valid email.')
    .custom((value, {req}) => {
        return User.findOne({email: value})
        .then(userDoc => {
            if (userDoc) {
                return Promise
                .reject('There is already an account with this email address.');
            }
        })
    }).normalizeEmail(),
    body('password').isLength({min: 8})
    .withMessage('Please use a password that is at least 8 characters long.')
    .trim(),
    body('confirmPassword').trim().custom((value, {req }) => {
        if(value !== req.body.password) {
            throw new Error('Passwords need to match.');
        }
        return true;
    })
],
   authController.postSignup);

//    //could add a custom validator like so:
//     .custom(value, { req }) => {
//         if (value === 'something') {
//             throw new Error('blah blah');
//         }
//     }

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);



module.exports = router;

//'mongodb+srv://JaronWhipple:fDf%40R9aGyv5UrrS@Cluster0.acauo.mongodb.net/nodejs?retryWrites=true&w=majority'