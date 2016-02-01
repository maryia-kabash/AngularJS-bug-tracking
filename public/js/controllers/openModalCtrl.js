(function(){
    'use strict';

    angular
        .module("bugs")
        .controller('OpenModalCtrl', OpenModalCtrl);

    function OpenModalCtrl($uibModal, $rootScope){
        var open = this;

        open.modalBug = function (board, column) {
            var modalInstance = $uibModal.open({
                templateUrl: 'views/partials/newCard.html',
                controller: 'CreateCtrl as create',
                data: {
                    requireLogin: true
                },
                resolve: {
                    column: function () {
                        return column;
                    }
                },
                onEnter: function(){
                    console.log("modal");
                }
            });
        };

        open.modalBoard = function () {
            var modalInstance = $uibModal.open({
                templateUrl: 'views/partials/newBoard.html',
                controller: 'CreateCtrl as create',
                data: {
                    requireLogin: true
                }
            });
        };

        open.modalLogin = function () {
            var modalInstance = $uibModal.open({
                templateUrl: 'views/partials/loginModal.html',
                controller: 'LoginModalCtrl',
                controllerAs: 'login'
            });
        };

        open.logout = function(){
            $rootScope.currentUser = 'undefined';
        };

        open.checkLogin = function(){
            if(typeof $rootScope.currentUser === 'undefined'){ return false; }
            return $rootScope.currentUser;
        };
    }
})();