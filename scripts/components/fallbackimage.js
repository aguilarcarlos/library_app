'use strict'

var _fallBackImage = function ($rootScope) {

    function linker ($scope, element, attrs) {
        var altSrc = attrs.fallbackSrc || 'https://unsplash.it/g/333/500/?random';

        element.attr('src', altSrc);

        element.bind('error', function() {
            angular.element(this).attr('src', altSrc);
        });
    }

    return {
        link: linker
    };
};

angular.module('app.components.fallbackimage', [])
    .directive('fallbackSrc', ['$rootScope', _fallBackImage]);
