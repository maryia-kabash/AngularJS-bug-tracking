(function(){
    'use strict';

    angular
        .module("bugs")
        .factory('UsersApi', UsersApi);

    function UsersApi(UsersFactory){

        return {
            login: function(email, password) {
                console.log(email);
                UsersFactory.find({ "email": email, "password": password }).$promise.then(function(data) {
                    console.log(data);
                    return data;
                });
            }
        };
    }
})();