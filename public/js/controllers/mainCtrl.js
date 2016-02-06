(function(){
    'use strict';

    angular
        .module("bugs")
        .controller('MainCtrl', MainCtrl);

    function MainCtrl(BoardManipulator, CurrentBoard, currentBrd, LocalStorage, UsersFactory, $state){
        var main = this;

        // Get current user
        main.currentUser = JSON.parse(LocalStorage.getUserFromLS());

        // Get all users except current from DB
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
        CurrentBoard.setCurrentBoard(currentBrd);

        // Update the board with new column
        main.addColumn = function(column){
            main.board.columns.push(column);
            BoardManipulator.addColumn(main.board);

            $state.go('dashboard', {boardID: main.board._id.$oid}, { reload: true });
        };

        // Remove the bug  where "i" is the order of the column
        main.deleteBug = function (board, bug, i) {
            var bugs = main.board.columns[i].bugs;
            bugs.splice(bugs.indexOf(bug), 1);

            BoardManipulator.deleteBug(board, bug, i);

        };

        main.kanbanSortOptions = BoardManipulator.sortOptions;
    }
})();