(function(){
    'use strict';

    angular
        .module("bugs")
        .controller('EditCtrl', EditCtrl);

    function EditCtrl($http, $stateParams){
        var edit = this;

        edit.title = "Bug card";
        edit.findbug = $stateParams;

        $http.get('/api/bug/' +edit.findbug.editID)
            .success(function(data){
                edit.bug = data;
            });

        console.log(edit.findbug);
        console.log(edit.findbug.editID);


        edit.editBug = function(bug){
            console.log(bug);
            $http.put('http://localhost:8080/api/bug/' + edit.findbug.editID, bug)
                .success(function(data){
                    edit.bug = data;
                   return edit.bug;
                });
            console.log(edit.bug.name);
            edit.message = "This bug is updated";
        };

        edit.deleteBug = function(bug){
          $http.delete('http://localhost:8080/api/bug/' + edit.findbug.editID, bug)
              .success(function(){
                  edit.message = "This bug is deleted";
              });
        };
    }
})();