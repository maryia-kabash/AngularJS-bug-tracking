(function(){
    'use strict';

    angular
        .module("bugs", ['ui.router', 'as.sortable', 'ui.bootstrap', 'ngResource'])

        //.run(function($rootScope) {
        //    $rootScope.$on("$stateChangeError", console.log.bind(console));
        //})
        .run(function ($rootScope, LoginModal) {

            $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
                var requireLogin = toState.data.requireLogin;

                if (requireLogin && typeof $rootScope.currentUser === 'undefined') {
                    event.preventDefault();

                    LoginModal()
                        .then(function () {
                            return $state.go(toState.name, toParams);
                        })
                        .catch(function () {
                            return $state.go('start');
                        });
                }
            });

        })

        .constant('constant', {
            boardUrl: 'https://api.mongolab.com/api/1/databases/angular-bugs/collections/boards/:_id',
            usersUrl: 'https://api.mongolab.com/api/1/databases/angular-bugs/collections/users/:_id',
            apiKey: '7sv3TyZTnueG_eTdxqgxa9zUjbDGtmOx'
        })

        .config(function config($stateProvider, $locationProvider, $httpProvider){

            $stateProvider.state("index", {
                url: '/',
                controller: 'StartCtrl',
                controllerAs: 'start',
                templateUrl: 'views/start.html',
                data: {
                    requireLogin: false
                },
                resolve: {
                    allboards:  function(BoardFactory) {
                        return BoardFactory.query().$promise.then(function(data) {
                            return data;
                        });
                    }
                }
            });

            $stateProvider.state("dashboard", {
                url: '/board/:boardID',
                controller: 'MainCtrl',
                controllerAs: 'main',
                templateUrl: 'views/dashboard.html',
                data: {
                    requireLogin: true
                },
                resolve: {
                    currentBrd: function($stateParams, BoardFactory) {

                        if($stateParams.boardID.length > 0){
                            return BoardFactory.find({ _id: $stateParams.boardID }).$promise.then(function(res) {
                                return res;
                            });
                        }
                    }
                }
            });

            $stateProvider.state("edit", {
                url: '/edit/:editName',
                controller: 'EditCtrl',
                controllerAs: 'edit',
                templateUrl: 'views/edit.html',
                data: {
                    requireLogin: true
                }
            });

            $locationProvider.html5Mode(true);

            $httpProvider.interceptors.push(function ($timeout, $q, $injector) {
                var LoginModal, $http, $state;

                // this trick must be done so that we don't receive
                // `Uncaught Error: [$injector:cdep] Circular dependency found`
                $timeout(function () {
                    LoginModal = $injector.get('LoginModal');
                    $http = $injector.get('$http');
                    $state = $injector.get('$state');
                });

                return {
                    responseError: function (rejection) {
                        if (rejection.status !== 401) {
                            return rejection;
                        }

                        var deferred = $q.defer();

                        LoginModal()
                            .then(function () {
                                deferred.resolve( $http(rejection.config) );
                            })
                            .catch(function () {
                                $state.go('start');
                                deferred.reject(rejection);
                            });

                        return deferred.promise;
                    }
                };
            });

        });
})();