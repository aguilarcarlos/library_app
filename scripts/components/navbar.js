'use strict'

var _navbarDirective = function ($rootScope) {
    return {
        restrict: 'E',
        templateUrl: 'partials/directives/navbar',
        replace: true
    };
};

angular.module('app.components.navbar', [])
    .directive('navBar', ['$rootScope', _navbarDirective]);
