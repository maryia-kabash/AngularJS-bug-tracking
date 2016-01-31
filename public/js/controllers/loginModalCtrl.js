(function(){
    'use strict';

    angular
        .module("bugs")
        .controller('LoginModalCtrl', LoginModalCtrl);

    function LoginModalCtrl(UsersFactory, $uibModalInstance){
        var login = this;

        login.dismiss = function () {
            $uibModalInstance.dismiss('cancel');
        };

        login.login = function (email, password) {
            var user = {email: email, password: password};
            UsersFactory.find(user).$promise.then(function(user) {
                console.log(user);

                setTimeout(function(user){
                    $uibModalInstance.close();
                }, 1500);
            });
        };

        login.signup = function (email, password) {
            var user = {email: email, password: password};
            UsersFactory.save(user);

            setTimeout(function(user){
                $uibModalInstance.close();
            }, 1500);
        };
    }
})();