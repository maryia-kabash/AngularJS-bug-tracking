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
app.use(express.static(__dirname + '/public'));

// routes ==================================================
var board = require('./app/routes_board');
//require('./app/routes')(app);

// ROUTES FOR OUR API =============================================================================
var router = express.Router();
router.use(function(req, res, next) {
    next();
});
router.get('/', function(req, res) {
    res.json({ message: 'api is working' });
});

router.route('/board')
    .post(board.add)
    .get(board.findAll);

router.route('/board/:board_id')
    .get(board.findById)
    .put(board.update)
    .delete(board.remove);

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);
exports = module.exports = app;

