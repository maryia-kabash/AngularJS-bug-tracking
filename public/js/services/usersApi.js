(function(){
    'use strict';

    angular
        .module("bugs")
        .factory('UsersApi', UsersApi);

    function UsersApi(UsersFactory){

        return {
            login: function(email, password) {
                UsersFactory.find({email: email, password: password }).$promise.then(function(data) {
                    console.log(data);
                    return data;
                }, function(errResponse) {
                    console.log(errResponse);
                });
            }
        };
    }
})();