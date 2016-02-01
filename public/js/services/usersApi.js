(function(){
    'use strict';

    angular
        .module("bugs")
        .factory('UsersApi', UsersApi);

    function UsersApi(UsersFactory){

        return {
            login: function(username, password) {

                var query = {
                    fo: true,
                    q: {
                        "username": username,
                        "password": password
                    }
                };

                UsersFactory.find(query).$promise.then(function(data) {
                    return data;
                });
            }
        };
    }
})();