(function(){
    'use strict';

    angular
        .module("bugs")
        .factory('CurrentBoard', CurrentBoard);

    function CurrentBoard($window){
        var currentboard, currentcolumn;

        // TODO find another solution
        return {
            setCurrentBoard: function (data) {
                $window.localStorage.setItem('currentboard', JSON.stringify(data));
                currentboard = data;
            },
            getCurrentBoard: function () {
                currentboard = currentboard || JSON.parse($window.localStorage.getItem('currentboard'));
                return currentboard;
            },
            setCurrentColumn: function (data) {
                $window.localStorage.setItem('currentcolumn', JSON.stringify(data));
                currentcolumn = data;
            },
            getCurrentColumn: function () {
                currentcolumn = currentcolumn || JSON.parse($window.localStorage.getItem('currentcolumn'));
                return currentcolumn;
            }
        };
    }
})();