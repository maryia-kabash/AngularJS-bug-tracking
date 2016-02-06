(function(){
    'use strict';

    angular
        .module("bugs")
        .controller('CreateCtrl', CreateCtrl);

    function CreateCtrl($uibModalInstance, BoardFactory, CurrentBoard, LocalStorage, ActivitiesFactory, $scope){
        var create = this;

        // Update the board with new bug (in the first column)
        create.board = CurrentBoard.getCurrentBoard();
        create.addNewCard = function(bug){
            var author = JSON.parse(LocalStorage.getUserFromLS());

            BoardFactory.find({ _id: create.board._id.$oid }).$promise.then(function(data) {
                create.board = data;

                var bugIndex = 1;
                for (var i = 0; i < create.board.columns.length; i++) {
                    bugIndex += create.board.columns[i].bugs.length;
                }
                bug.index = "0."+bugIndex;
                create.board.columns[0].bugs.push(bug);

                BoardFactory.update({ _id: create.board._id.$oid }, create.board);

                // create a new document in activities collection
                var activity = {
                    "boardId": create.board._id,
                    "bugNumber": bugIndex.toString(),
                    "created": {
                        "author": author.username,
                        "date":   {$date: new Date().toISOString()}
                    },
                    "moved": [],
                    "commented": []
                };
                ActivitiesFactory.save(activity);
            });

            setTimeout(function(){
                $uibModalInstance.close(bug);
            }, 1500);
        };

        // Create new board
        create.addNewBoard = function(board, columns){

            // Remove empty fields
            var cleanColumns = [];
            for (var i = 0; i < columns.length; i++) {
                if(columns[i].name.length > 0) {
                    cleanColumns.push(columns[i]);
                }
            }
            board.columns = cleanColumns;

            BoardFactory.save(board);

            setTimeout(function(){
                $uibModalInstance.close(create.board);
            }, 1500);
        };

        // Add a column to a newly created board
        create.columns = [];
        create.addMoreColumns = function () {
            create.columns.push({
                name: "",
                bugs: [],
                order: ''
            });
        };

        create.dismiss = function () {
            $uibModalInstance.dismiss('cancel');
        };

    }
})();

