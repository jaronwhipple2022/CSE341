// this will help with path navigation
const path = require('path');

const express = require('express');

const rootDir = require('../util/path')
const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
  //pug
  const products = adminData.products;
  res.render('shop', {prods: products, pageTitle: 'Shop', path: '/', hasProducts: products.length > 0});
  //console.log('shop.js', adminData.products);
  //directions to path are this wy from path module
  //res.sendFile(path.join(rootDir, 'views', 'shop.html'));
  });

module.exports = router;