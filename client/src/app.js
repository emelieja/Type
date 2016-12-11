import angular from 'angular';
angular.module('type', [])
.controller('typeController', function($http) {
    $http.get('/types').then((response) => {
        this.types = response.data;
    });
});