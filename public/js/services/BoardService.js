/*jshint undef: false, unused: false, indent: 2*/
/*global angular: false */

'use strict';

angular.module('bugs').service('BoardService', ['BoardManipulator', function (BoardManipulator) {

  return {
    removeCard: function (board, column, card) {
      if (confirm('Are You sure to Delete?')) {
        BoardManipulator.removeCardFromColumn(board, column, card);
      }
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