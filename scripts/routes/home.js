'use strict';

angular.module('app.routes.home', ['ui.router'])
    .config([
        '$stateProvider',
        '$urlRouterProvider',
        function (
            $stateProvider,
            $urlRouterProvider
        ) {

        $stateProvider.state('home', {
            url: '/',
            abstract: true,
            template: '<div ui-view></div>'
        });

        $stateProvider.state('home.index', {
            url: '',
            templateUrl: 'partials/home',
            controller: 'HomeController'
        });

        $urlRouterProvider.when('/', ['$state', function($state) {
            $state.go('home.index');
        }]);
    }]);