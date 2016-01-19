(function(){
    'use strict';

    angular
        .module("bugs")
        .controller('EditCtrl', EditCtrl);

    function EditCtrl($stateParams, $state, CurrentBoard, BoardFactory){
        var edit = this;

        edit.title = "Bug card";

        var bugname = $stateParams.editName;
        var columnOrder = CurrentBoard.getCurrentColumn();
        edit.board = CurrentBoard.getCurrentBoard();

        // Find the bug to edit
        var bugs = edit.board.columns[columnOrder].bugs;
        for (var j = 0; j < bugs.length; j++) {
            if (bugs[j].name === bugname) {
                edit.bug =  bugs[j];
                return;
            }
        }

        // Update the bug
        edit.editBug = function(bug){

            //var index = edit.board.columns[columnOrder].bugs.indexOf(bug);
            //edit.board.columns[columnOrder].bugs.splice(index, 1);
            //BoardFactory.update({ id: board._id }, edit.board);

            edit.message = "This bug is updated";

            setTimeout(function(){
                $state.go('index');
            }, 1500)
        };

        // Delete the bug
        edit.deleteBug = function(bug){

            var index = edit.board.columns[columnOrder].bugs.indexOf(bug);
            edit.board.columns[columnOrder].bugs.splice(index, 1);
            BoardFactory.update({ id: edit.board._id }, edit.board);

            setTimeout(function(){
                $state.go('index');
            }, 1500)
        };
    }
})();