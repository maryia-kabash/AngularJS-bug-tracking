(function(){
    'use strict';

    angular
        .module("bugs")
        .controller('MainCtrl', MainCtrl);

    function MainCtrl($http, $scope){
        var main = this;

        main.title = "List of bugs";

        $http.get('http://localhost:8080/api/bug')
            .success(function(data){
                main.bugs = data;
            });

        main.addBug = function(bug){
            $http.post('http://localhost:8080/api/bug', bug)
                .success(function(data){
                    main.bugs = data;
                });
        };

        $http.get('http://localhost:8080/api/column')
            .success(function(data){
                main.columns = data;
            });

        main.addColumn = function(column){
            $http.post('http://localhost:8080/api/column', column)
                .success(function(data){
                    main.columns = data;
                });
        };

        main.getBugsByColumn = function(columnId){
            return main.bugs.reduce(function(values, item){
                (item.column === columnId) && values.push(item);
                return values;
            }, []);
        };

        main.kanbanSortOptions = {
            itemMoved: function (event) {
                event.source.itemScope.modelValue.status = event.dest.sortableScope.$parent.column.name;
            },
            orderChanged: function (event) {
            },
            containment: '#board1'
        };

        main.board = function(){
            var board = new Board(board.name, board.numberOfColumns);
            angular.forEach(board.columns, function (column) {

                BoardManipulator.addColumn(kanbanBoard, column.name);

                angular.forEach(column.cards, function (card) {

                    BoardManipulator.addCardToColumn(kanbanBoard, column, card.title, card.details);

                });
            });
            return board;
        };
    }
})();