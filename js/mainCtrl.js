(function(){
    'use strict';

    angular
        .module("bugs", ['ui.router'])
        .config(function config($stateProvider){
            $stateProvider.state("index", {
                url: "",
                controller: "MainCtrl as main",
                templateURL: "templates/main.html"
            })
        })
        .controller('MainCtrl', MainCtrl);

    function MainCtrl(){
        var main = this;

        main.title = "Super Awesome Bug Tracking System";
    }
})();