(function(){
    'use strict';

    angular
        .module("bugs")
        .factory('CurrentBoard', CurrentBoard);

    function CurrentBoard(){
        var currentboard, currentcolumn;

        return {
            setCurrentBoard: function (data) {
                currentboard = data;
            },
            getCurrentBoard: function () {
                return currentboard;
            },
            setCurrentColumn: function (data) {
                currentcolumn = data;
            },
            getCurrentColumn: function () {
                return currentcolumn;
            }
        };
    }
})();