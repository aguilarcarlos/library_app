'use strict'

var _navbarDirective = function ($rootScope) {

    function linker ($scope, element, attrs) {
        console.log('Todo Something');
    }

    return {
        restrict: 'E',
        templateUrl: 'partials/directives/navbar',
        replace: true,
        link: linker
    };
};

angular.module('app.components.navbar', [])
    .directive('navBar', ['$rootScope', _navbarDirective]);
