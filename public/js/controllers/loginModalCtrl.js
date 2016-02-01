(function(){
    'use strict';

    angular
        .module("bugs")
        .controller('LoginModalCtrl', LoginModalCtrl);

    function LoginModalCtrl(UsersFactory, $uibModalInstance, $rootScope){
        var login = this;

        function assignCurrentUser (user) {
            $rootScope.currentUser = user;
            return user;
        }

        login.dismiss = function () {
            $uibModalInstance.dismiss('cancel');
        };

        login.login = function (username, password) {
            login.message = "";
            var user = {
                fo: true,
                q: {
                    "username": username,
                    "password": password
                }
            };

            UsersFactory.find(user).$promise.then(function(data) {

                if (data !== null) {
                    assignCurrentUser(data);
                    setTimeout(function(data){
                        $uibModalInstance.close();
                    }, 1500);
                } else {
                    login.message = "Username or password is incorrect";
                }

            });
        };

        login.signup = function (username, email, password) {
            var user = {username: username, email: email, password: password};
            UsersFactory.save(user);

            assignCurrentUser(user);

            setTimeout(function(user){
                $uibModalInstance.close();
            }, 1500);
        };
    }
})();