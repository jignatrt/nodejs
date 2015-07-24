'use strict';
angular.module('lookup.account', ['ngRoute', 'ngResource'])

        .config(['$routeProvider', function ($routeProvider) {
                $routeProvider.when('/account', {
                    templateUrl: 'account/account.html',
                    controller: 'accountCtrl'
                });
            }])
        .factory('UserData', ['$resource', function (resource) {
                var api = resource('api/settings/:action/:subAction/:subAction1', {}, {
                    setting: {
                        method: 'POST'
                    }
                });
                return {
                    setting: function (data) {
                        return api.setting(data).$promise;
                    }
                };
            }])
        .controller('accountCtrl', ['$scope', '$window', 'UserData', '$location', function ($scope, $window, UserData, $location) {
                $scope.user = JSON.parse($window.localStorage.getItem('user'));
                $scope.save = function () {
                    UserData.setting($scope.user)
                            .then(function (response) {
                                $window.localStorage.removeItem('user');
                                $window.localStorage.setItem('user', JSON.stringify(response.user));
                                $location.path('/dashboard');
                            })
                            .catch(function () {

                            });
                };
            }]);