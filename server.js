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
//require('./app/routes')(app); // pass our application into our routes //это было в оригинальном туториале, без подключения к БД

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();
router.use(function(req, res, next) {
    next();
});
router.get('/', function(req, res) {
    res.json({ message: 'api is working' });
});

var Bug = require('./app/models/bug');
router.route('/bug')
    .post(function(req, res) {
        var bug = new Bug();
        bug.name = req.body.name;
        bug.type = req.body.type;
        bug.summary = req.body.summary;
        bug.priority = req.body.priority;
        bug.descr = req.body.descr;
        bug.project = req.body.project;
        bug.column = req.body.column; //"56926ec6e6ffefff0a0b4b5d"; // id первой колонки To do

        bug.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Bug created!'+ bug.name });
        });

    })

    .get(function(req, res) {
        Bug.find(function(err, bugs) {
            if (err)
                res.send(err);

            res.json(bugs);
        });
    });

router.route('/bug/:bug_id')
    .get(function(req, res) {
        Bug.findById(req.params.bug_id, function(err, bug) {
            if (err)
                res.send(err);
            res.json(bug);
        });
    })

    .put(function(req, res) {

        Bug.findById(req.params.bug_id, function(err, bug) {
            if (err)
                res.send(err);

            bug.name = req.body.name;
            bug.type = req.body.type;
            bug.summary = req.body.summary;
            bug.priority = req.body.priority;
            bug.descr = req.body.descr;
            bug.project = req.body.project;
            bug.column = req.body.column;

            bug.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'bug updated!' });
            });

        });
    })
    .delete(function(req, res) {
        Bug.remove({
            _id: req.params.bug_id
        }, function(err, bug) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

// columns
var Column = require('./app/models/column');
router.route('/column')
    .post(function(req, res) {
        var column = new Column();
        column.name = req.body.name;
        column.order = req.body.order;

        column.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Column created!'+ column.name });
        });

    })

    .get(function(req, res) {
        Column.find(function(err, columns) {
            if (err)
                res.send(err);

            res.json(columns);
        });
    });

router.route('/column/:column_id')
    .get(function(req, res) {
        Column.findById(req.params.column_id, function(err, column) {
            if (err)
                res.send(err);
            res.json(column);
        });
    })

    .put(function(req, res) {
        Column.findById(req.params.column_id, function(err, column) {
            if (err)
                res.send(err);

            column.name = req.body.name;
            column.bugs = req.body.bugs;

            column.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'column updated!' });
            });

        });
    })
    .delete(function(req, res) {
        Column.remove({
            _id: req.params.column_id
        }, function(err, column) {
            if (err)
                res.send(err);
            res.json({ message: 'Successfully deleted' });
        });
    });

// BOARDS
// columns
var Board = require('./app/models/board');
router.route('/board')
    .post(function(req, res) {
        var board = new Board();
        board.name = req.body.name;
        board.columns = req.body.columns;

        board.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'board created!'+ board.name });
        });

    })

    .get(function(req, res) {
        Board.find(function(err, boards) {
            if (err)
                res.send(err);

            res.json(boards);
        });
    });

router.route('/board/:board_id')
    .get(function(req, res) {
        Board.findById(req.params.board_id, function(err, board) {
            if (err)
                res.send(err);
            res.json(board);
        });
    })

    .put(function(req, res) {
        Board.findById(req.params.board_id, function(err, board) {
            if (err)
                res.send(err);

            board.name = req.body.name;
            board.columns = req.body.columns;

            board.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'board updated!' });
            });

        });
    })
    .delete(function(req, res) {
        Board.remove({
            _id: req.params.board_id
        }, function(err, board) {
            if (err)
                res.send(err);
            res.json({ message: 'Successfully deleted' });
        });
    });



// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);
exports = module.exports = app;

