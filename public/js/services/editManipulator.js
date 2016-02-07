(function(){
    'use strict';

    angular
        .module("bugs")
        .factory('EditManipulator', EditManipulator);

    function EditManipulator(BoardFactory, ActivitiesFactory, CurrentBoard, LocalStorage, $stateParams){

        var currentBoard = CurrentBoard.getCurrentBoard();
        var bugIndex = $stateParams.editId;
        var columnOrder = +bugIndex.slice(0, 1);

        return {
            findBug: function(){
                var bugs = currentBoard.columns[columnOrder].bugs;
                for (var j = 0; j < bugs.length; j++) {
                    if (bugs[j].index === bugIndex) {
                        return bugs[j];
                    }
                }
            },
            findActivities: function(cb){
                var bugNumber = bugIndex.substring(2);
                var activity = {
                    fo: true,
                    q: {
                        boardId: currentBoard._id,
                        bugNumber: bugNumber
                    }
                };

                ActivitiesFactory.find(activity).$promise.then(function(data) {

                    var activities = data;

                    // Get names for columns
                    var columnNames = [];
                    for (var i = 0; i < currentBoard.columns.length; i++) {
                        columnNames.push(currentBoard.columns[i].name);
                    }
                    for (var n = 0; n < activities.moved.length; n++) {
                        activities.moved[n].fromColumn = columnNames[activities.moved[n].fromColumn];
                        activities.moved[n].toColumn = columnNames[activities.moved[n].toColumn];
                    }

                    cb(activities);
                });
            },
            updateBug: function(){
                currentBoard.columns[columnOrder].bugs[j-1] = bug;
                BoardFactory.update({ _id: currentBoard._id.$oid }, currentBoard);
            }
        };
    }
})();