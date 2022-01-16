// this will help with path navigation
const path = require('path');

const express = require('express');

const rootDir = require('../util/path')

const router = express.Router();

const products = [];

//changed to get... will use direct match /admin....
// path is /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
    //pu implementation
    res.render('add-product', {pageTitle: 'Add Product', path: '/admin/add-product'});
    //directions to path are this wy from path module
    //res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
  });

//same path can be used IF methods differ
// path is /admin/add-product => POST
router.post('/add-product', (req, res, next) => {
    //add product button adds to products array
    products.push({title: req.body.title});
    res.redirect('/');
  });
  
exports.routes = router;
exports.products = products;

  