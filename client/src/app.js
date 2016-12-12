import angular from 'angular'
import 'angular-ui-router'
angular.module('type', ["ui.router"])

.config(($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('/cards')

    $stateProvider
        .state('cards', {
            abstract: true,
            url: '/cards',
            templateUrl: 'cards/cards.html',
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
        .state('cards.list', {
            url: '',
            templateUrl: 'cards/list/list.html'
        })
        .state('cards.about', {
            url: '/about',
            templateUrl: 'about/about.html'
        })
        .state('cards.typology', {
            url: '/:typologyName',
            templateUrl: 'typology/typology.html',
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
            controllerAs: 'typoCtrl'
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
    templateUrl: 'cards/card/card.html'
})