(function(){
    'use strict';

    angular
        .module("bugs")
        .controller('CreateCtrl', CreateCtrl)

    function CreateCtrl(bug){
        var create = this;

        create.title = "Add a bug";
        create.bug = bug;
    }
})();