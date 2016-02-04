(function(){
    'use strict';

    angular
        .module("bugs")
        .controller('MainCtrl', MainCtrl);

    function MainCtrl(BoardFactory, CurrentBoard, currentBrd, LocalStorage, UsersFactory){
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
        //Clear filters
        main.clearFilters = function(){
            main.selectedUser = false;
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

        main.setColumn = function(columnOrder){
            CurrentBoard.setCurrentColumn(columnOrder);
        };

        main.kanbanSortOptions = {
            itemMoved: function (event) {
                var destIndex = event.source.itemScope.modelValue.order = event.dest.sortableScope.$parent.column.order; // order of destination column
                var destBugs = event.dest.sortableScope.modelValue; // array of bugs in an updated destination column

                var parentIndex = event.source.itemScope.sortableScope.$parent.$index; // order of previous column
                var parentBugs = event.source.itemScope.sortableScope.modelValue; // array of bugs in an updated previous column

                var updatedBoard = main.board;
                updatedBoard.columns[parentIndex].bugs = parentBugs;
                updatedBoard.columns[destIndex].bugs = destBugs;

                BoardFactory.update({ _id: updatedBoard._id.$oid }, updatedBoard);
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