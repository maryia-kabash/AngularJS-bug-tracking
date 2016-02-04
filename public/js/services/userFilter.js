(function(){
    'use strict';

    angular
        .module("bugs")
        .filter('UserFilter', UserFilter);

    function UserFilter(){

        return function (cards, selectedUser) {
            //if (cards.length > 0 && selectedUser ) {
            if ( selectedUser ) {
                var tempCards = [];
                angular.forEach(cards, function (card) {
                    if (angular.equals(card.author, selectedUser)) {
                        tempCards.push(card);
                    }
                });
                return tempCards;
            } else {
                return cards;
            }
        };
    }
})();