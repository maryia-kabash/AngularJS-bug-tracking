(function(){
    'use strict';

    angular
        .module("bugs")
        .controller('EditCtrl', EditCtrl);

    function EditCtrl($stateParams, $state, CurrentBoard, BoardFactory){
        var edit = this;

        edit.title = "Bug card";

        //TODO replace bugname with bug index, add column order
        var bugIndex = $stateParams.editId;
        var columnOrder = +bugIndex.slice(0, 1);
        edit.board = CurrentBoard.getCurrentBoard();


        // Find the bug to edit
        var bugs = edit.board.columns[columnOrder].bugs;
        for (var j = 0; j < bugs.length; j++) {
            if (bugs[j].index === bugIndex) {
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