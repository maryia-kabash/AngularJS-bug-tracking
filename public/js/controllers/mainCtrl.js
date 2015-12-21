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

        main.dragControlListeners = {
            accept: function (sourceItemHandleScope, destSortableScope) {
                return true;
            },
            itemMoved: function (event) {
                event.source.itemScope.modelValue.status = event.dest.sortableScope.$parent.column.name;
            },
            orderChanged: function(event) {

            },
            containment: '#board',
            clone: true ,
            allowDuplicates: false
        };
        main.dragControlListeners1 = {
            containment: '#board',
            allowDuplicates: true
        };
    }
})();