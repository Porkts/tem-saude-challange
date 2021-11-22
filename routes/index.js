require('dotenv').config();
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Cadastro de Clinicas',
    mapboxApi: process.env.MAPBOX_API_KEY,
    googleApi: process.env.GOOGLE_API_KEY,
  });
});

module.exports = router;
