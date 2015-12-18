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

        var sharedData = {};

        EditService.set(sharedData);
    }
})();