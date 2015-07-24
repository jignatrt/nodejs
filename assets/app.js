'use strict';

angular.module('lookup', [
    'ngRoute',
    'ui.bootstrap',
    'lookup.version',
    'lookup.login',
    'lookup.dashboard',
    'lookup.account'
]).config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/login'});
    }]);
