(function(){
    'use strict';

    angular
        .module("bugs")
        .controller('EditCtrl', EditCtrl)

    function EditCtrl(bug){
        var edit = this;

        edit.title = "Edit bugs";
        edit.bug = bug;
    }
})();