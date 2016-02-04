(function(){
    'use strict';

    angular
        .module("bugs")
        .filter('PriorityFilter', PriorityFilter);

    function PriorityFilter(){

        return function (cards, selectedPriority) {
            if (cards.length > 0 && selectedPriority ) {
                var tempCards = [];
                angular.forEach(cards, function (card) {
                    if (angular.equals(card.priority, selectedPriority)) {
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