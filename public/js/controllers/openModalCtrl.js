(function(){
    'use strict';

    angular
        .module("bugs")
        .controller('OpenModalCtrl', OpenModalCtrl);

    function OpenModalCtrl($uibModal, $rootScope, LoginModal, $state, LocalStorage){
        var open = this;

        open.currentUser = JSON.parse(LocalStorage.getUserFromLS());

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
            LocalStorage.removeUserFromLS();
            $state.go('index');
        };

        open.checkLogin = function(){
            $rootScope.currentUser = LocalStorage.getUserFromLS();
            return $rootScope.currentUser;
        };
    }
})();