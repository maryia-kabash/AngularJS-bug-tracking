(function(){
    'use strict';

    angular
        .module("bugs")
        .controller('CreateCtrl', CreateCtrl);

    function CreateCtrl($uibModalInstance, BoardFactory, CurrentBoard, LocalStorage){
        var create = this;

        // Update the board with new bug (in the first column)
        create.board = CurrentBoard.getCurrentBoard();
        create.addNewCard = function(bug){
            var author = JSON.parse(LocalStorage.getUserFromLS());
            bug.author = author.username;
            bug.date = { $date: new Date().toISOString()};

            BoardFactory.find({ _id: create.board._id.$oid }).$promise.then(function(data) {
                create.board = data;

                var bugIndex = 1;
                for (var i = 0; i < create.board.columns.length; i++) {
                    bugIndex += create.board.columns[i].bugs.length;
                }
                bug.index = "0."+bugIndex;
                create.board.columns[0].bugs.push(bug);

                BoardFactory.update({ _id: create.board._id.$oid }, create.board);
            });

            setTimeout(function(){
                $uibModalInstance.close(bug);
            }, 1500);
        };

        // Create new board
        create.addNewBoard = function(board, columns){

            board.columns = columns;

            BoardFactory.save(board);

            setTimeout(function(){
                $uibModalInstance.close(board);
            }, 1500);
        };

        // Add a column to a newly created board
        create.columns = [];
        create.addMoreColumns = function () {
            create.columns.push({
                name: "",
                bugs: [],
                order: ''
            });
        };

        create.dismiss = function () {
            $uibModalInstance.dismiss('cancel');
        };

    }
})();

