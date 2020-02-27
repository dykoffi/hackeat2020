var express = require('express');
var router = express.Router();
var moment = require("moment")
var app = require('express')();
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
moment.locale('fr')
router.get('/', function (req, res, next) {
  
    res.render('accueil/index', { title: 'hackEat | Accueil', host: req.hostname, date:moment().format('dddd, Do MMMM YYYY'), heure:moment().format('hh'), minute:moment().format('mm') });
});

module.exports = router;