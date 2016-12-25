angular.module('app.filters.html', [])
    .filter('html', ['$sce',function($sce) {
        return function(value) {
            return $sce.trustAsHtml(value);
        }
    }]);