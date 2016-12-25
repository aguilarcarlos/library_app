'use strict'

var _alertsDirective = function ($log, _) {

    function linker ($scope, element, attrs) {
        $scope.alerts = [];

        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

        if ($scope.collection && $scope.collection.length) {
            if (!$scope.collection[0].type || !$scope.collection[0].message) {
                $log.error('Alerts shoud have objects with \'type\' and \'message\' properties');
                return;
            }

            $scope.alerts = _.concat($scope.alerts, $scope.collection);
            return;
        }

        $scope.alerts.push({
            type: $scope.type,
            message: $scope.message
        });
    }

    return {
        restrict: 'E',
        scope: {
            type: '=',
            message: '=',
            collection: '='
        },
        templateUrl: 'partials/directives/alerts',
        replace: true,
        link: linker
    };
};

angular.module('app.components.alerts', [])
    .directive('alertContainer', ['$log', '_', _alertsDirective]);
