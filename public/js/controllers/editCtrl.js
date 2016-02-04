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
        console.log(columnOrder);

        // Find the bug to edit
        var bugs = edit.board.columns[columnOrder].bugs;
        for (var j = 0; j < bugs.length; j++) {
            if (bugs[j].name === bugname) {
                edit.bug =  bugs[j];
            }
        }

        // Update the bug
        edit.updateBug = function(bug){

            edit.board.columns[columnOrder].bugs[j-1] = bug;
            var id = edit.board._id.$oid;
            BoardFactory.update({ _id: id }, edit.board);
            edit.message = "This bug is updated";

            setTimeout(function(){
                $state.go('dashboard', { boardID: id });
            }, 1500);
        };

        // Delete the bug
        edit.deleteBug = function(bug){

            var index = edit.board.columns[columnOrder].bugs.indexOf(bug);
            edit.board.columns[columnOrder].bugs.splice(index, 1);
            BoardFactory.update({ _id: edit.board._id.$oid }, edit.board);

            setTimeout(function(){
                $state.go('dashboard');
            }, 1500);
        };
    }
})();