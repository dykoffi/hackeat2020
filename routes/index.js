var express = require('express');
var router = express.Router();

var app = require('express')();
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

router.get('/', function (req, res, next) {
    res.render('accueil/index', { title: 'hackEat | Accueil', host: req.hostname });
});

module.exports = router;