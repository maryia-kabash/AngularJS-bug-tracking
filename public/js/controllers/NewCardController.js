/*jshint undef: false, unused: false, indent: 2*/
/*global angular: false */


'use strict';

angular.module('bugs').controller('NewCardController', ['$scope', '$uibModalInstance', 'column', function ($scope, $modalInstance, column) {

    var newcard = this;

  function initScope(scope) {
    scope.columnName = column.name;
    scope.column = column;
    scope.title = '';
    scope.details = '';
  }

    newcard.addNewCard = function () {
    if (!this.newCardForm.$valid) {
      return false;
    }
    $modalInstance.close({title: this.title, column: column, details: this.details});
  };

    newcard.close = function () {
    $modalInstance.close();
  };

  initScope(newcard);

}]);

