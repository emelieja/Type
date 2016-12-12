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
                    return $http.get('/types');
                }
            },
            controller: function (cardsService) {
                this.types = cardsService.data;
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