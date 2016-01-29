(function(){
    'use strict';

    angular
        .module("bugs")
        .factory('LoginModal', LoginModal);

    function LoginModal($uibModal, $rootScope){
        function assignCurrentUser (user) {
            $rootScope.currentUser = user;
            return user;
        }

        return function() {
            var instance = $uibModal.open({
                templateUrl: 'views/partials/loginModal.html',
                controller: 'LoginModalCtrl',
                controllerAs: 'login'
            });

            return instance.result.then(assignCurrentUser);
        };
    }
})();