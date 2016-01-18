(function(){
    'use strict';

    angular
        .module("bugs")
        .controller('ModalCtrl', ModalCtrl);

    function ModalCtrl($http, $uibModalInstance, $stateParams){
        var modal = this;

        modal.findbug = $stateParams;

        modal.addNewCard = function (bug) {
            //if (!this.newCardForm.$valid) {
            //    return false;
            //}
            $http.post('http://localhost:8080/api/bug', bug)
                .success(function(data){
                    modal.bugs = data;
                });
            modal.message = "This bug is added successfully";

            $http.get('http://localhost:8080/api/column/'+ bug.column)
                .success(function(data){
                    var column = data;

                    column.bugs.push(bug);
                    console.log(column);

                    $http.put('http://localhost:8080/api/column/' + bug.column, column)
                        .success(function(data){
                            modal.column = data;
                            return modal.column;
                        });
                });

            setTimeout(function(){
                $uibModalInstance.close(bug);
            }, 1500);

        };

        modal.dismiss = function () {
            $uibModalInstance.dismiss('cancel');
        };

    }
})();

