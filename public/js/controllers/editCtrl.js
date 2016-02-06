(function(){
    'use strict';

    angular
        .module("bugs")
        .controller('EditCtrl', EditCtrl);

    function EditCtrl($stateParams, $state, CurrentBoard, BoardFactory, ActivitiesFactory, LocalStorage){
        var edit = this;

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

        // get bug activities
        var bugNumber = bugIndex.substring(2);
        var activity = {
            fo: true,
            q: {
                boardId: edit.board._id,
                bugNumber: bugNumber
            }
        };

        ActivitiesFactory.find(activity).$promise.then(function(data) {
            edit.activities = data;

            // Get names for columns
            var columnNames = [];
            for (var i = 0; i < edit.board.columns.length; i++) {
                columnNames.push(edit.board.columns[i].name);
            }

            for (var n = 0; n < edit.activities.moved.length; n++) {
                edit.activities.moved[n].fromColumn = columnNames[edit.activities.moved[n].fromColumn];
                edit.activities.moved[n].toColumn = columnNames[edit.activities.moved[n].toColumn];
            }

        });

        // Write a comment
        edit.comment = function(text){
            var author = JSON.parse(LocalStorage.getUserFromLS());
            edit.activities.commented.push({
                "author": author.username,
                "text": text,
                "date":   {$date: new Date().toISOString()}
            });
            ActivitiesFactory.update({ _id: edit.activities._id.$oid }, edit.activities);
        };

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