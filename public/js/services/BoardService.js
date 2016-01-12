/*jshint undef: false, unused: false, indent: 2*/
/*global angular: false */

'use strict';

angular.module('bugs').service('BoardService', ['$uibModal', 'BoardManipulator', function ($modal, BoardManipulator) {

  return {
    removeCard: function (board, column, card) {
      if (confirm('Are You sure to Delete?')) {
        BoardManipulator.removeCardFromColumn(board, column, card);
      }
    },

    addNewCard: function (board, column) {
      var modalInstance = $modal.open({ //ctrl
        templateUrl: 'views/partials/newCard.html',
        controller: 'NewCardController',
        backdrop: 'static',
        resolve: {
          column: function () {
            return column;
          }
        }
      });
      modalInstance.result.then(function (cardDetails) { //ctrl
        if (cardDetails) {
          BoardManipulator.addCardToColumn(board, cardDetails.column, cardDetails.title, cardDetails.details);
        }
      });
    },
    kanbanBoard: function (board) {
      var kanbanBoard = new Board(board.name, board.numberOfColumns);
      angular.forEach(board.columns, function (column) {
        BoardManipulator.addColumn(kanbanBoard, column.name);
        angular.forEach(column.cards, function (card) {
          BoardManipulator.addCardToColumn(kanbanBoard, column, card.title, card.details);
        });
      });
      return kanbanBoard;
    }
  };
}]);