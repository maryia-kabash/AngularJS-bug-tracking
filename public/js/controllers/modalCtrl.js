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

            BoardFactory.find({ id: modal.board._id }).$promise.then(function(data) {

                modal.board = data;
                modal.board.columns[0].bugs.push(bug);

                BoardFactory.update({ id: modal.board._id }, modal.board);
            });

            setTimeout(function(){
                $uibModalInstance.close(bug);
            }, 1500);
        };

        // Create new board
        modal.addNewBoard = function(board){

            BoardFactory.save(board, function() {
               console.log('saved')
            });

            setTimeout(function(){
                $uibModalInstance.close(board);
            }, 1500);
        };

        modal.dismiss = function () {
            $uibModalInstance.dismiss('cancel');
        };

    }
})();

