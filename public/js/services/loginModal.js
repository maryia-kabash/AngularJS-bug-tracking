(function(){
    'use strict';

    angular
        .module("bugs")
        .factory('LoginModal', LoginModal);

    function LoginModal($uibModal, $rootScope){

        function assignCurrentUser (user) {
            $rootScope.currentUser = user;
            console.log(user);
            return user;
        }

        return {
            openmodal: function() {

                var modalInstance = $uibModal.open({
                    templateUrl: 'views/partials/loginModal.html',
                    controller: 'LoginModalCtrl',
                    controllerAs: 'login'
                });

                return modalInstance.result.then(assignCurrentUser);
            }
        };
    }
})();