(function(){
    'use strict';

    angular
        .module("bugs", ['ui.router', 'as.sortable', 'ui.bootstrap', 'ngResource'])
        .config(function config($stateProvider, $locationProvider){
            $stateProvider.state("index", {
                url: '',
                controller: 'MainCtrl',
                controllerAs: 'main',
                templateUrl: 'views/dashboard.html'
            });
            $stateProvider.state("dashboard", {
                url: '/:boardID',
                controller: 'MainCtrl',
                controllerAs: 'main',
                templateUrl: 'views/dashboard.html'
            });
            //$stateProvider.state("create", {
            //    url: '/create',
            //    controller: 'CreateCtrl',
            //    controllerAs: 'create',
            //    templateUrl: 'views/create.html'
            //});
            $stateProvider.state("edit", {
                url: '/edit/:editName',
                controller: 'EditCtrl',
                controllerAs: 'edit',
                templateUrl: 'views/edit.html'
            });

            //$locationProvider.html5Mode(true); //removes # from URL and breaks onload index state
            // resolve
            // http resourse
        });
})();