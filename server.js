// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

// configuration ===========================================
var db = require('./config/db');

var port = process.env.PORT || 8080;
mongoose.connect(db.url);

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));

app.use(express.static(__dirname + '/public.build'));
app.use(function(req, res) {
    res.sendFile('index.html', { root: __dirname + "/public.build" });
});

app.listen(port);
console.log('Magic happens on port ' + port);

