(function(){
    'use strict';

    angular
        .module("bugs")
        .controller('MainCtrl', MainCtrl);

    function MainCtrl(BoardFactory, CurrentBoard, currentBrd, LocalStorage, UsersFactory, ActivitiesFactory){
        var main = this;

        // Get current user
        main.currentUser = JSON.parse(LocalStorage.getUserFromLS());

        // Get all users from DB
        UsersFactory.query().$promise.then(function(data) {
            main.users = data.filter(function (el) {
                    return el.username !== main.currentUser.username;
                });
        });

        // Filter by username
        main.filterByUsername = function(username){
            main.selectedUser = username;
        };
        // Filter by priority
        main.filterByPriority = function(priority){
          main.selectedPriority = priority;
        };
        //Clear filters
        main.clearFilters = function(){
            main.selectedUser = false;
            main.selectedPriority = false;
        };

        // Get a board
        main.board = currentBrd;
        CurrentBoard.setCurrentBoard(main.board);

        // Update the board with new column
        main.addColumn = function(board, column){
            main.board.columns.push(column);
            BoardFactory.update({ _id: board._id.$oid }, main.board);
        };

        // Remove the bug  where "i" is the order of the column
        main.deleteBug = function(board, bug, i){

            var index = main.board.columns[i].bugs.indexOf(bug);
            main.board.columns[i].bugs.splice(index, 1);
            BoardFactory.update({ _id: board._id.$oid }, main.board);
        };

        main.kanbanSortOptions = {
            itemMoved: function (event) {
                var destIndex = event.source.itemScope.modelValue.order = event.dest.sortableScope.$parent.column.order; // order of destination column

                var parentIndex = event.source.itemScope.sortableScope.$parent.$index; // order of previous column
                var parentBugs = event.source.itemScope.sortableScope.modelValue; // array of bugs in an updated previous column

                var bugIndex = event.source.itemScope.modelValue.index; // get moved bug index
                var columnIndex = bugIndex.substring(0, 1);
                var updatedIndex = bugIndex.replace(columnIndex, destIndex);

                var destBugs = event.dest.sortableScope.modelValue; // array of bugs in an updated destination column

                for (var j = 0; j < destBugs.length; j++) {
                    if (destBugs[j].index === bugIndex) {
                        var bug =  destBugs[j]; //get bug with index to be updated
                        bug.index = updatedIndex;
                    }
                }

                var updatedBoard = main.board;
                updatedBoard.columns[parentIndex].bugs = parentBugs;
                updatedBoard.columns[destIndex].bugs = destBugs;

                BoardFactory.update({ _id: updatedBoard._id.$oid }, updatedBoard);

                //update activities collection
                var activity = {
                    fo: true,
                    q: { boardId: updatedBoard._id }
                };
                ActivitiesFactory.find(activity).$promise.then(function(data) {
                    var updatedActivity = data;
                    updatedActivity.moved.push({
                        "author": main.currentUser.username,
                        "date": {$date: new Date().toISOString()},
                        "fromColumn": parentIndex,
                        "toColumn": destIndex
                    });

                    ActivitiesFactory.update(activity, updatedActivity);
                });

            },
            orderChanged: function (event) {
                var orderedBugs = event.source.sortableScope.modelValue; // array of bugs
                var orderedColumn = event.source.itemScope.modelValue.order = event.dest.sortableScope.$parent.column.order; // reordered column

                var updatedBoard = main.board;
                updatedBoard.columns[orderedColumn].bugs = orderedBugs;

                BoardFactory.update({ _id: updatedBoard._id.$oid }, updatedBoard);
            },
            containment: '#board'
        };
    }
})();