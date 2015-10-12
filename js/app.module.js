(function(){
    'use strict';

    angular
        .module("bugs", ['ui.router'])
        .config(function config($stateProvider){
            $stateProvider.state("index", {
                url: '',
                controller: 'MainCtrl',
                controllerAs: 'main',
                templateUrl: 'templates/dashboard.html'
            });
            $stateProvider.state("create", {
                url: '/create',
                controller: 'CreateCtrl',
                controllerAs: 'create',
                templateUrl: 'templates/create.html'
            });
        })
        .service("bug", function Bug(){
            var bug = this;

            bug.name = "Bug #1";
        })

})();