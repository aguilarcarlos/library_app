'use strict';

var _spinnerContainer = function ($log, $rootScope, $timeout) {
    function linker ($scope, element, attrs) {
        $rootScope.spin = false;
    }

    return {
        restrict: 'E',
        transclude: true,
        templateUrl: function () {
            return 'app-templates/spinner-container';
        },
        replace: true,
        link: linker
    };
};

var _spinner = function () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: function () {
            return 'app-templates/spinner';
        }
    };
};

var _SpinnerService = function (_, $rootScope, $log) {
    return {
        show: function () {
            $log.debug('Showing spinner');
            $rootScope.spin = true;
        },
        hide: function () {
            $log.debug('Hidding spinner');
            $rootScope.spin = false;
        },
        isVisible: function () {
            return !!$rootScope.spin;
        }
    };
};

angular.module('app.services.SpinnerService', [])
    .run(['$templateCache', function ($templateCache) {
        var template_spinnerContainer = '\
            <div class="spinner-container" ng-if="spin">\
                <ng-transclude></ng-transclude>\
            </div>';

        var template_spinner = '\
            <div class="spinner">\
                <div class="double-bounce1"></div>\
                <div class="double-bounce2"></div>\
            </div>';

        $templateCache.put('app-templates/spinner-container', template_spinnerContainer);
        $templateCache.put('app-templates/spinner', template_spinner);
    }])
    .directive('spinnerContainer', ['$log', '$rootScope', '$timeout', _spinnerContainer])
    .directive('spinner', [_spinner])
    .factory('SpinnerService', ['_', '$rootScope', '$log', _SpinnerService]);