(function(){
    'use strict';

    angular
        .module("bugs", ['ui.router', 'as.sortable', 'ui.bootstrap', 'ngResource'])
        .config(function config($stateProvider, $locationProvider){
            $stateProvider.state("index", {
                url: '',
                controller: 'MainCtrl',
                controllerAs: 'main',
                templateUrl: 'views/dashboard.html',
                //resolve: {
                //    allboards:  function(BoardFactory) {
                //        return BoardFactory.query().$promise.then(function(data) {
                //            return data;
                //        })
                //    }
                //}
            });

            $stateProvider.state("dashboard", {
                url: '/:boardID',
                controller: 'MainCtrl',
                controllerAs: 'main',
                templateUrl: 'views/dashboard.html',
                //resolve: {
                //    allboards:  function(BoardFactory) {
                //        return BoardFactory.query().$promise.then(function(data) {
                //                return data;
                //        })
                //    },
                //    currentBrd: function($stateParams, BoardFactory) {
                //        return BoardFactory.find({ id: $stateParams.boardID }).$promise.then(function(res) {
                //            return res;
                //        });
                //    }
                //}
            });

            $stateProvider.state("edit", {
                url: '/edit/:editName',
                controller: 'EditCtrl',
                controllerAs: 'edit',
                templateUrl: 'views/edit.html'
            });

            //$locationProvider.html5Mode(true); //removes # from URL and breaks onload index state
            // resolve
        });
})();