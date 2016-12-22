'use strict';

angular.module('app', [
    'ui.router',
    'ngAnimate',
    'ngTouch',
    'ui.bootstrap',

    'app.components.navbar',
    'app.components.books.grid',

    'app.services.BookService',
    'app.services.CategoryService',
    'app.services.ConfigurationService',
    'app.services.UtilService',

    'app.router'
])

.constant('_', window._)
.constant('moment', window.moment)

.config(['$locationProvider', function ($locationProvider) {
    $locationProvider.html5Mode(true);
}])

.run([
    '$rootScope',
    '$http',
    'AppConfig',
    'ConfigurationService',
    '$log',
    function (
        $rootScope,
        $http,
        AppConfig,
        ConfigurationService,
        $log
    ) {
        $http.defaults.headers.common['app-key'] = AppConfig.api_key;

        ConfigurationService.getConfig()
            .then(function (response) {
                angular.extend(AppConfig, response);
                $log.info("[app.js] Configuration fetched.");
            })
            .catch(function(error) {
                $log.error("[app.js] error", error);
            });

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            $log.info("[app.js] $stateChangeStart");
        });

        $rootScope.$on('$stateChangeSuccess', function (e, state, params, fromState) {
            $log.info("[app.js] $stateChangeSuccess");
        });
    }
]);