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

// routes ==================================================
//require('./app/routes')(app); // pass our application into our routes //это было в оригинальном туториале, без подключения к БД

// ROUTES FOR OUR API
// =============================================================================
//var router = express.Router();
//router.use(function(req, res, next) {
//    next();
//});
//router.get('/', function(req, res) {
//    res.json({ message: 'api is working' });
//});
//
//// BOARDS
//
//var Board = require('./app/models/board');
//router.route('/board')
//    .post(function(req, res) {
//        var board = new Board();
//        board.name = req.body.name;
//        board.columns = req.body.columns;
//
//        board.save(function(err) {
//            if (err)
//                res.send(err);
//
//            res.json({ message: 'board created!'+ board.name });
//        });
//    })
//
//    .get(function(req, res) {
//        Board.find(function(err, boards) {
//            if (err)
//                res.send(err);
//
//            res.json(boards);
//        });
//    });
//
//router.route('/board/:board_id')
//    .get(function(req, res) {
//        Board.findById(req.params.board_id, function(err, board) {
//            if (err)
//                res.send(err);
//            res.json(board);
//        });
//    })
//
//    .put(function(req, res) {
//        Board.findById(req.params.board_id, function(err, board) {
//            if (err)
//                res.send(err);
//
//            board.name = req.body.name;
//            board.columns = req.body.columns;
//
//            board.save(function(err) {
//                if (err)
//                    res.send(err);
//                res.json({ message: 'board updated!' });
//            });
//        });
//    })
//    .delete(function(req, res) {
//        Board.remove({
//            _id: req.params.board_id
//        }, function(err, board) {
//            if (err)
//                res.send(err);
//            res.json({ message: 'Successfully deleted' });
//        });
//    });
//
//// REGISTER OUR ROUTES -------------------------------
//// all of our routes will be prefixed with /api
//app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);
exports = module.exports = app;

