(function(){
    'use strict';

    angular
        .module("bugs")
        .controller('MainCtrl', MainCtrl);

    function MainCtrl($http, $scope, BoardService, BoardDataFactory){
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

        //$http.get('http://localhost:8080/api/column')
        //    .success(function(data){
        //        main.columns = data;
        //    });
        //main.addNewColumn = function(column){
        //    $http.post('http://localhost:8080/api/column', column)
        //        .success(function(data){
        //            main.columns = data;
        //        });
        //    main.message = "This bug is added successfully";
        //
        //
        //};
        //


        //main.kanbanBoard = BoardService.kanbanBoard(BoardDataFactory.kanban);
        //
        //main.kanbanSortOptions = {
        //
        //    itemMoved: function (event) {
        //        event.source.itemScope.modelValue.status = event.dest.sortableScope.$parent.column.name;
        //    },
        //    orderChanged: function (event) {
        //    },
        //    containment: '#board'
        //};
        //
        //main.removeCard = function (column, card) {
        //    BoardService.removeCard($scope.kanbanBoard, column, card);
        //};
        //
        //$scope.addNewCard = function () {
        //    BoardService.addNewCard($scope.kanbanBoard, "To Do");
        //}

    }
})();