(function(){
    'use strict';

    angular
        .module("bugs", ['ui.router'])
        .run(function ($rootScope, $state, $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        })
        .config(function config($stateProvider){
            $stateProvider.state("index", {
                url: "",
                controller: "MainCtrl as main",
                templateURL: "templates/main.html"
            });
            $state.go("index");
        })

})();