'use strict';

angular.module('app.routes.categories', ['ui.router'])
    .config([
        '$stateProvider',
        function (
            $stateProvider
        ) {
            $stateProvider.state('categories', {
                url: '/categories',
                abstract: true,
                template: '<div ui-view></div>'
            });

            $stateProvider.state('categories.index', {
                url: '',
                templateUrl: 'partials/categories'
            });
        }
    ]);