(function(){
    'use strict';

    angular
        .module("bugs")
        .controller('CreateCtrl', CreateCtrl);

    function CreateCtrl($uibModal, BoardManipulator){
        var create = this;

        create.title = "Add a bug";

        create.openModal = function (board, column) {
            var modalInstance = $uibModal.open({
                templateUrl: 'views/partials/newCard.html',
                controller: 'ModalCtrl as modal',
                backdrop: 'static',
                resolve: {
                    column: function () {
                        return column;
                    }
                }
            });
            //modalInstance.result.then(function (cardDetails) {
            //    if (cardDetails) {
            //        BoardManipulator.addCardToColumn(board, cardDetails.column, cardDetails.title, cardDetails.details);
            //    }
            //});
        };
    }
})();