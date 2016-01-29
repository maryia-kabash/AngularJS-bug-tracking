(function(){
    'use strict';

    angular
        .module("bugs")
        .factory('LoginModal', LoginModal);

    function LoginModal($modal, $rootScope){
        function assignCurrentUser (user) {
            $rootScope.currentUser = user;
            return user;
        }

        return function() {
            var instance = $modal.open({
                templateUrl: 'views/partials/loginModal.html',
                controller: 'LoginModalCtrl',
                controllerAs: 'login'
            });

            return instance.result.then(assignCurrentUser);
        };
    }
})();