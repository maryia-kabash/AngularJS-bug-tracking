(function(){
    'use strict';

    angular
        .module("bugs")
        .controller('OpenModalCtrl', OpenModalCtrl);

    function OpenModalCtrl($uibModal, $rootScope, LoginModal, $state){
        var open = this;

        open.modalBug = function () {
            var modalInstance;
            if (typeof $rootScope.currentUser === 'undefined') {
                LoginModal.openmodal()
                    .then(function () {
                        modalInstance = $uibModal.open({
                            templateUrl: 'views/partials/newCard.html',
                            controller: 'CreateCtrl as create'
                        });
                        return modalInstance;
                    })
                    .catch(function () {
                        return $state.go('index');
                    });
            } else {
                modalInstance = $uibModal.open({
                    templateUrl: 'views/partials/newCard.html',
                    controller: 'CreateCtrl as create'
                });
            }
        };

        open.modalBoard = function () {
            var modalInstance;
            if (typeof $rootScope.currentUser === 'undefined') {
                LoginModal.openmodal()
                    .then(function () {
                        modalInstance = $uibModal.open({
                            templateUrl: 'views/partials/newBoard.html',
                            controller: 'CreateCtrl as create'
                        });
                        return modalInstance;
                    })
                    .catch(function () {
                        return $state.go('index');
                    });
            } else {
                modalInstance = $uibModal.open({
                    templateUrl: 'views/partials/newBoard.html',
                    controller: 'CreateCtrl as create'
                });
            }
        };

        open.modalLogin = function () {
            LoginModal.openmodal();
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