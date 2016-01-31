(function(){
    'use strict';

    angular
        .module("bugs")
        .controller('OpenModalCtrl', OpenModalCtrl);

    function OpenModalCtrl($uibModal, LoginModal){
        var open = this;

        open.modalBug = function (board, column) {
            var modalInstance = $uibModal.open({
                templateUrl: 'views/partials/newCard.html',
                controller: 'CreateCtrl as create',
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

        open.modalBoard = function (board) {
            var modalInstance = $uibModal.open({
                templateUrl: 'views/partials/newBoard.html',
                controller: 'CreateCtrl as create',
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

        open.modalLogin = function () {
            new LoginModal();
        };
    }
})();