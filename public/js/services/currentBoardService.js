(function(){
    'use strict';

    angular
        .module("bugs")
        .factory('CurrentBoard', CurrentBoard);

    function CurrentBoard(){
        var currentboard;

        return {
            setCurrentBoard: function (data) {
                currentboard = data;
            },
            getCurrentBoard: function () {
                return currentboard;
            }
        };
    }
})();