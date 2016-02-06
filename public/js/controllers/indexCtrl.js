(function(){
    'use strict';

    angular
        .module("bugs")
        .controller('IndexCtrl', IndexCtrl);

    function IndexCtrl(BoardFactory, $scope){
        var index = this;

        BoardFactory.query().$promise.then(function(data) {
            index.boards = data;
        });

        $scope.$on("boards", function(e){
            BoardFactory.query().$promise.then(function(data) {
                index.boards = data;
            });
        });
    }
})();