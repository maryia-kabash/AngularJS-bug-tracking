(function(){
    'use strict';

    angular
        .module("bugs")
        .controller('CreateCtrl', CreateCtrl);

    function CreateCtrl($uibModalInstance, BoardFactory, CurrentBoard){
        var create = this;

        // Update the board with new bug (in the first column)
        create.board = CurrentBoard.getCurrentBoard();
        create.addNewCard = function(bug){

            BoardFactory.find({ _id: create.board._id.$oid }).$promise.then(function(data) {

                create.board = data;
                console.log(data);
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

