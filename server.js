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

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// routes ==================================================
//require('./app/routes')(app); // pass our application into our routes //это было в оригинальном туториале, без подключения к БД

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

var Bug = require('./app/models/bug');

router.route('/bug')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {
        var bug = new Bug();      // create a new instance of the Bear model
        bug.name = req.body.name;
        bug.type = req.body.type;
        bug.summary = req.body.summary;
        bug.priority = req.body.priority;
        bug.descr = req.body.descr;

        // save the bear and check for errors
        bug.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Bug created!'+ bug.name });
        });

    })

    // get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function(req, res) {
        Bug.find(function(err, bugs) {
            if (err)
                res.send(err);

            res.json(bugs);
        });
    });

// on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route('/bug/:bug_id')

    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        Bug.findById(req.params.bug_id, function(err, bug) {
            if (err)
                res.send(err);
            res.json(bug);
        });
    })

    // update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
    .put(function(req, res) {

        // use our bear model to find the bear we want
        Bug.findById(req.params.bug_id, function(err, bug) {

            if (err)
                res.send(err);

            bug.name = req.body.name;

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

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);


// start app ===============================================
app.listen(port);
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app

