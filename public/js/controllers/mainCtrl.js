(function(){
    'use strict';

    angular
        .module("bugs")
        .controller('MainCtrl', MainCtrl);

    function MainCtrl($stateParams, BoardFactory, CurrentBoard){
        var main = this;

        // Get a board
        BoardFactory.query().$promise.then(function(data) {

            main.boards = data;

            if($stateParams.boardID.length > 0) {
                main.selectedboard = $stateParams;

                BoardFactory.find({ id: main.selectedboard.boardID }).$promise.then(function(res) {
                    main.board = res;
                    CurrentBoard.setCurrentBoard(main.board);
                });

            } else {
                main.board = main.boards[0];
                CurrentBoard.setCurrentBoard(main.board);
            }
        });

        // Update the board with new column
        main.addColumn = function(board, column){
            main.board.columns.push(column);
            BoardFactory.update({ id: board._id }, main.board);
        };

        // Remove the bug  where "i" is the order of the column
        main.deleteBug = function(board, bug, i){

            var index = main.board.columns[i].bugs.indexOf(bug);

            main.board.columns[i].bugs.splice(index, 1);

            BoardFactory.update({ id: board._id }, main.board);
        };

        main.kanbanSortOptions = {
            itemMoved: function (event) {
                event.source.itemScope.modelValue.status = event.dest.sortableScope.$parent.column.name;
            },
            orderChanged: function (event) {
            },
            containment: '#board'
        };

        main.dashboard = function(){
            var dashboard = new Board(board.name, board.numberOfColumns);
            angular.forEach(board.columns, function (column) {

                BoardManipulator.addColumn(kanbanBoard, column.name);

                angular.forEach(column.cards, function (card) {

                    BoardManipulator.addCardToColumn(kanbanBoard, column, card.title, card.details);

                });
            });
            return dashboard;
        };


    }
})();