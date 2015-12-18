(function(){
    'use strict';

    angular
        .module("bugs")
        .controller('CreateCtrl', CreateCtrl)

    function CreateCtrl($http){
        var create = this;

        create.title = "Add a bug";

        create.addBug = function(bug){
            $http.post('http://localhost:8080/api/bug', bug)
                .success(function(data){
                    create.bugs = data;
                });
            create.message = "This bug is added successfully";


        }
    }
})();