(function(){
    'use strict';

    angular
        .module("bugs")
        .controller('LoginModalCtrl', LoginModalCtrl);

    function LoginModalCtrl($scope, UsersApi, LoginModal){
        var login = this;

        login.openLoginModal = function(){
            LoginModal();
        };

        login.cancel = $scope.$dismiss;

        login.submit = function (email, password) {
            UsersApi.login(email, password).$promise.then(function (user) {
                $scope.$close(user);
            });
        };
    }
})();