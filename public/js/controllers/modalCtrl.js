(function(){
    'use strict';

    angular
        .module("bugs")
        .controller('ModalCtrl', ModalCtrl);

    function ModalCtrl($uibModalInstance, BoardFactory, CurrentBoard){
        var modal = this;

        // Update the board with new bug (in the first column)
        modal.board = CurrentBoard.getCurrentBoard();
        modal.addNewCard = function(bug){

            BoardFactory.find({ _id: modal.board._id.$oid }).$promise.then(function(data) {

                modal.board = data;
                console.log(data);
                modal.board.columns[0].bugs.push(bug);

                BoardFactory.update({ _id: modal.board._id.$oid }, modal.board);
            });

            setTimeout(function(){
                $uibModalInstance.close(bug);
            }, 1500);
        };

        // Create new board
        modal.addNewBoard = function(board, columns){

            board.columns = columns;

            BoardFactory.save(board);

            setTimeout(function(){
                $uibModalInstance.close(board);
            }, 1500);
        };

        // Add a column to a newly created board
        modal.columns = [];
        modal.addMoreColumns = function () {
            modal.columns.push({
                name: "",
                bugs: [],
                order: ''
            });
        };

        modal.dismiss = function () {
            $uibModalInstance.dismiss('cancel');
        };

    }
})();

