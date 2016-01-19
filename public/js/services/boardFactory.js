(function(){
    'use strict';

    angular
        .module("bugs")
        .factory('BoardFactory', BoardFactory);

    function BoardFactory($resource){
        return $resource('http://localhost:8080/api/board/:id', null, {
            update:{
                method: 'PUT',
                isArray: false
            },
            query: {
                isArray:true,
                interceptor: {
                    response: function(response) {
                        return response.data;
                    }
                }
            },
            get: {
              isArray:true
            },
            find: {
                method: 'GET',
                isArray: false,
                interceptor: {
                    response: function(response) {
                        return response.data;
                    }
                }
            }
        });
    }
})();