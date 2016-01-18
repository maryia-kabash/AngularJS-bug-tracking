(function(){
    'use strict';

    angular
        .module("bugs")
        .factory('BoardFactory', BoardFactory);

    function BoardFactory($resource){
        return $resource('http://localhost:8080/api/board/:board_id');
    }
})();