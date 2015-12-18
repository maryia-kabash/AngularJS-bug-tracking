(function(){
    'use strict';

    angular
        .module("bugs")
        .controller('EditCtrl', EditCtrl)

    function EditCtrl(bug){
        var edit = this;

        edit.title = "Edit bugs";
        edit.bug = bug;

        edit.editBug = function(bug){
            $http.post('http://localhost:8080/api/bug', bug)
                .success(function(data){
                    edit.bugs = data;
                });
            edit.message = "This bug is updated successfully";


        }
    }
})();