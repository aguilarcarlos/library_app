'use strict';

angular.module('app.routes.books', ['ui.router'])
    .config([
        '$stateProvider',
        function (
            $stateProvider
        ) {
            $stateProvider.state('books', {
                url: '/books',
                abstract: true,
                template: '<div ui-view></div>'
            });

            $stateProvider.state('books.index', {
                url: '',
                templateUrl: 'partials/books'
            });
        }
    ]);