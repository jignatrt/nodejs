'use strict';
angular.module('lookup.dashboard', ['ngRoute', 'ngResource', 'infinite-scroll'])

        .config(['$routeProvider', function ($routeProvider) {
                $routeProvider.when('/dashboard', {
                    templateUrl: 'dashboard/dashboard.html',
                    controller: 'dashboardCtrl'
                });
            }])
        .factory('MatrixData', ['$resource', function (resource) {
                var api = resource('api/search/matrix/:action/:subAction/:subAction1', {}, {
                    getDataByKeyword: {
                        method: 'GET'
                    }
                });
                return {
                    getDataByKeyword: function (search, page, access, secret) {
                        return api.getDataByKeyword({search: search, page: page, resultsPerPage: 50, access: access, secret: secret}).$promise;
                    }
                };
            }])
        .controller('dashboardCtrl', ['$scope', 'MatrixData', '$window', function ($scope, MatrixData, $window) {
                console.log("dashboardCtrl");
                $scope.links = [];
                $scope.currentPage = 1;
                $scope.getData = function () {
                    $scope.currentPage = 1;
                    $scope.links = [];
                    $scope.fetch();
                };
                $scope.loggedInUser = JSON.parse($window.localStorage.getItem('user'));
                $scope.fetch = function () {
                    $scope.fetching = true;
                    MatrixData.getDataByKeyword($scope.keyword, $scope.currentPage, $scope.loggedInUser.mozKey, $scope.loggedInUser.mozAccessId)
                            .then(function (response) {
                                $scope.currentPage += 1;
                                //console.log("Response --" + JSON.stringify(response));
                                $scope.links = $scope.links.concat(response.data);
                                $scope.fetching = false;
                            })
                            .catch(function (err, data) {
                                $scope.fetching = false;
                                console.log("err --" + JSON.stringify(err));
                            });
                };
                $scope.logout = function(){
                    $window.localStorage.removeItem('user');
                };
            }]);