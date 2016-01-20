(function(){
    'use strict';

    angular
        .module("bugs")
        .controller('StartCtrl', StartCtrl);

    function StartCtrl(allboards){
        var start = this;

        start.title = "Choose a board to work with";

        start.boards = allboards;
    }
})();