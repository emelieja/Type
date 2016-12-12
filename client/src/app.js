import angular from 'angular'
import 'angular-ui-router'
angular.module('type', ["ui.router"])

.config(($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('/cards')

    $stateProvider
        .state('cards', {
            url: '/cards',
            templateUrl: 'cards/cards-nav.html',
            resolve: {
                cardsService: function ($http) {
                    return $http.get('/cards');
                }
            },
            controller: function (cardsService) {
                this.cards = cardsService.data;
            },
            controllerAs: 'typeCtrl'
        })
        .state('cards.typology', {
            url: '/:typologyName',
            templateUrl: 'cards/cards-typology.html',
            resolve: {
                cardService: function ($q) {
                    return $q((resolve, reject) => {
                        let card = {
                            "name": "Myers-Briggs",
                            "goldMedals": [
                                {
                                    "division": "Top",
                                    "country": "US",
                                    "year": 2012
                                },
                                {
                                    "division": "Good",
                                    "country": "Sweden",
                                    "year": 2013
                                }
                            ]
                        };
                        resolve({data: card});
                    })
                }
            },
            controller: function(cardService) {
                this.card = cardService.data;
            },
            controllerAs: 'cardCtrl'
        })
})
.component('cardItem', {
    bindings: {
        name: '<',
        description: '<?',
        image: '<?'
    },
    controller: function() {
        this.message = "We are in cardItemController";
    },
    controllerAs: 'cardItemCtrl',
    templateUrl: 'cards/card-component/card.html'
})