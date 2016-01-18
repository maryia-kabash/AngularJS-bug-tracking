(function(){
    'use strict';

    angular
        .module("bugs")
        .controller('MainCtrl', MainCtrl);

    function MainCtrl($http, $scope, $stateParams, BoardFactory){
        var main = this;

        // Get a board
        BoardFactory.query().$promise.then(function(data) {
            main.boards = data;

            if( main.boards.length === 1) {
                main.board = main.boards[0];
            } else {
                main.selectedboard = $stateParams;

                $http.get('/api/board/' +main.selectedboard.boardID)  //TODO replace with resource
                    .success(function(data){
                        main.board = data;
                    });
            }
        });

        main.addColumn = function(column){
            $http.post('http://localhost:8080/api/column', column)
                .success(function(data){
                    main.columns = data;
                });
        };
        //$http.get('http://localhost:8080/api/bug')
        //    .success(function(data){
        //        main.bugs = data;
        //    });
        //
        //main.addBug = function(bug){
        //    $http.post('http://localhost:8080/api/bug', bug)
        //        .success(function(data){
        //            main.bugs = data;
        //        });
        //};
        //main.getBugsByColumn = function(columnId){
        //    return main.bugs.reduce(function(values, item){
        //        (item.column === columnId) && values.push(item);
        //        return values;
        //    }, []);
        //};

        main.kanbanSortOptions = {
            itemMoved: function (event) {
                event.source.itemScope.modelValue.status = event.dest.sortableScope.$parent.column.name;
            },
            orderChanged: function (event) {
            },
            containment: '#board'
        };

        //main.board = function(){
        //    var board = new Board(board.name, board.numberOfColumns);
        //    angular.forEach(board.columns, function (column) {
        //
        //        BoardManipulator.addColumn(kanbanBoard, column.name);
        //
        //        angular.forEach(column.cards, function (card) {
        //
        //            BoardManipulator.addCardToColumn(kanbanBoard, column, card.title, card.details);
        //
        //        });
        //    });
        //    return board;
        //};

        main.deleteBug = function(bug){
            //$http.delete('http://localhost:8080/api/bug/' + bug._id, bug)
            //    .success(function(){
            //        main.bugs.splice(main.bugs.indexOf(bug),1);
            //    });
        };
    }
})();