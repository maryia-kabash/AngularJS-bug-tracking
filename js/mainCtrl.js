(function(){
    'use strict';

    angular
        .module("bugs")
        .controller('MainCtrl', MainCtrl)

    function MainCtrl(bug){
        var main = this;

        main.title = "Super Awesome Bug Tracking System";
        main.bug = bug;
    }
})();