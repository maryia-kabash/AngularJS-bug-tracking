(function(){
    'use strict';

    angular
        .module("bugs")
        .controller('LoginModalCtrl', LoginModalCtrl);

    function LoginModalCtrl(UsersFactory, $uibModalInstance, $rootScope, bcrypt){
        var login = this;

        function assignCurrentUser (user) {
            $rootScope.currentUser = user;
            return user;
        }

        login.login = function (username, password) {
            login.message = "";

            var user = {
                fo: true,
                q: {"username": username}
            };

            UsersFactory.find(user).$promise.then(function(data) {

                if (data !== null) {
                    var match = bcrypt.compareSync(password, data.password);
                    if (match) {
                        assignCurrentUser(data);
                        setTimeout(function(){
                            $uibModalInstance.close();
                        }, 1500);
                    } else {
                        login.message = "Password is incorrect";
                    }
                } else {
                    login.message = "Username is incorrect or doesn't exist";
                }
            });
        };

        login.signup = function (username, email, password) {
            var user, hashedPassword;

            var SALT_WORK_FACTOR = 10;

            bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
                if (err) return next(err);

                bcrypt.hash(password, salt, function(err, hash) {
                    if (err) return next(err);
                    hashedPassword = hash;

                    user = {username: username, email: email, password: hashedPassword};

                    UsersFactory.save(user);
                    assignCurrentUser(user);

                    setTimeout(function(user){
                        $uibModalInstance.close();
                    }, 1500);
                });
            });

        };

        login.dismiss = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();