var Board = require('./models/board');


exports.findAll = function(req, res) {

        Board.find(function(err, boards) {
            if (err)
                res.send(err);

            res.json(boards);
        });
    };
exports.add = function(req, res) {
        var board = new Board();
        board.name = req.body.name;
        board.columns = req.body.columns;

        board.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'board created!'+ board.name });
        });
    };
exports.findById = function(req, res) {
        Board.findById(req.params.board_id, function(err, board) {
            if (err)
                res.send(err);
            res.json(board);
        });
    };
exports.update = function(req, res) {
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
    };
exports.remove = function(req, res) {
        Board.remove({
            _id: req.params.board_id
        }, function(err, board) {
            if (err)
                res.send(err);
            res.json({ message: 'Successfully deleted' });
        });
    };

//    // route to handle all angular requests
//exports.get('*', function(req, res) {
//        res.sendfile('./public/index.html'); // load our public/index.html file
//    });


