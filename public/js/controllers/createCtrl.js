(function(){
    'use strict';

    angular
        .module("bugs")
        .controller('CreateCtrl', CreateCtrl);

    function CreateCtrl($uibModalInstance, CreateManipulator, CurrentBoard){
        var create = this;

        create.board = CurrentBoard.getCurrentBoard();

        // Update the board with new bug (in the first column)
        create.addNewCard = function(bug){
            CreateManipulator.addNewCard(bug);

            setTimeout(function(){
                $uibModalInstance.close(bug);
            }, 1500);
        };

        // Create new board
        create.addNewBoard = function(board, columns){
            CreateManipulator.addNewBoard(board, columns);

            setTimeout(function(){
                $uibModalInstance.close(create.board);
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

