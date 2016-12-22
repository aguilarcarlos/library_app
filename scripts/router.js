'use strict';

angular.module('app.router', ['ui.router'])
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

        $stateProvider.state('categories', {
            url: '/categories',
            abstract: true,
            template: '<div ui-view></div>'
        });

        $stateProvider.state('categories.index', {
            url: '',
            templateUrl: 'partials/categories',
            controller: 'CategoryController'
        });

        $stateProvider.state('books', {
            url: '/books',
            abstract: true,
            template: '<div ui-view></div>'
        });

        $stateProvider.state('books.index', {
            url: '',
            templateUrl: 'partials/books',
            controller: 'BookController'
        });

        $stateProvider.state('books.detail', {
            url: '/:book_id',
            templateUrl: 'partials/booksDetail',
            controller: 'BookController'
        });

        $urlRouterProvider.when('/', ['$state', function($state) {
            $state.go('home.index');
        }]);
    }]);