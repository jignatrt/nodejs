'use strict';
angular.module('lookup.login', ['ngRoute', 'ngResource'])

        .config(['$routeProvider', function ($routeProvider) {
                $routeProvider.when('/login', {
                    templateUrl: 'login/login.html',
                    controller: 'loginCtrl'
                });
            }])
        .factory('LoginData', ['$resource', function (resource) {
                var api = resource('login/:action/:subAction/:subAction1', {}, {
                    login: {
                        method: 'POST'
                    }
                });
                return {
                    login: function (email, password) {
                        return api.login({email: email, password: password}).$promise;
                    }
                };
            }])
        .controller('loginCtrl', ['$scope', 'LoginData', '$location', '$window', function ($scope, LoginData, $location, $window) {
                if (JSON.parse($window.localStorage.getItem('user'))) {
                    $location.path('/dashboard');
                }
                $scope.credential = {
                    email: 'test@lookup.com',
                    password: 'test123'
                };
                $scope.doLogin = function () {
                    LoginData.login($scope.credential.email, $scope.credential.password)
                            .then(function (responce) {
                                console.log("Response " + JSON.stringify(responce));
                                $window.localStorage.setItem('user', JSON.stringify(responce.user));
                                $location.path('/dashboard');
                            })
                            .catch(function (err) {
                                console.log("err " + JSON.stringify(err));
                            });
                };
            }]);