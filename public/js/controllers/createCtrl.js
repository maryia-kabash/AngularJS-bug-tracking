(function(){
    'use strict';

    angular
        .module("bugs")
        .controller('CreateCtrl', CreateCtrl);

    function CreateCtrl($uibModal){
        var create = this;

        create.openModal = function (board, column) {
            var modalInstance = $uibModal.open({
                templateUrl: 'views/partials/newCard.html',
                controller: 'ModalCtrl as modal',
                backdrop: 'static',
                resolve: {
                    column: function () {
                        return column;
                    }
                }
            });
        };

        create.openModalBoard = function (board) {
            var modalInstance = $uibModal.open({
                templateUrl: 'views/partials/newBoard.html',
                controller: 'ModalCtrl as modal',
                backdrop: 'static',
                resolve: {
                    board: function () {
                        return board;
                    }
                }
            });
        };
    }
})();