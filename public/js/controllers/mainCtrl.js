(function(){
    'use strict';

    angular
        .module("bugs")
        .controller('MainCtrl', MainCtrl);

    function MainCtrl($http){
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

        main.kanbanSortOptions = {
            itemMoved: function (event) {
                event.source.itemScope.modelValue.status = event.dest.sortableScope.$parent.column.name;
            },
            orderChanged: function (event) {
            },
            containment: '#board1'
        };

    }
})();