(function(){
    'use strict';

    angular
        .module("bugs")
        .controller('CreateCtrl', CreateCtrl);

    function CreateCtrl($uibModal){
        var create = this;

        create.openModalBug = function (board, column) {
            var modalInstance = $uibModal.open({
                templateUrl: 'views/partials/newCard.html',
                controller: 'ModalCtrl as modal',
                backdrop: 'static',
                data: {
                    requireLogin: true
                },
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
                data: {
                    requireLogin: true
                },
                resolve: {
                    board: function () {
                        return board;
                    }
                }
            });
        };
    }
})();