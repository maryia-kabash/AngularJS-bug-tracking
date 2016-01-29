(function(){
    'use strict';

    angular
        .module("bugs")
        .controller('IndexCtrl', IndexCtrl);

    function IndexCtrl(BoardFactory){
        var index = this;

        BoardFactory.query().$promise.then(function(data) {
            index.boards = data;
        });
    }
})();