'use strict';

angular.module('app', [
    'ui.router',
    'ngAnimate',
    'ngTouch',
    'ui.bootstrap',

    'app.components.navbar',
    'app.components.books.grid',
    'app.components.fallbackimage',
    'app.components.alerts',

    'app.services.BookService',
    'app.services.CategoryService',
    'app.services.ConfigurationService',
    'app.services.UtilService',
    'app.services.SpinnerService',

    'app.filters.html',

    'app.router'
])

.constant('_', window._)
.constant('he', window.he)
.constant('moment', window.moment)

.config(['$locationProvider', '$qProvider', '$httpProvider', function ($locationProvider, $qProvider, $httpProvider) {
    $locationProvider.html5Mode(true);

    //$qProvider.errorOnUnhandledRejections(false);

    $httpProvider.interceptors.push('myHttpInterceptor');
}])

.run([
    '$rootScope',
    '$http',
    '$httpParamSerializerJQLike',
    'AppConfig',
    'ConfigurationService',
    '$log',
    function (
        $rootScope,
        $http,
        $httpParamSerializerJQLike,
        AppConfig,
        ConfigurationService,
        $log
    ) {
        $http.defaults.headers.common['app-key'] = AppConfig.api_key;
        $http.defaults.transformRequest.unshift($httpParamSerializerJQLike);
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';
        $http.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';

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
])
.factory('myHttpInterceptor', ['$q', function($q) {
  return {
    // optional method
    'request': function(config) {
        // do something on success
        return config;
    },

    // optional method
   'requestError': function(rejection) {
        // do something on error
        if (canRecover(rejection)) {
            return responseOrNewPromise
        }

        return $q.reject(rejection);
    },



    // optional method
    'response': function(response) {
        // do something on success
        return response;
    },

    // optional method
   'responseError': function(rejection) {
        // do something on error
        if (canRecover(rejection)) {
            return responseOrNewPromise
        }

        return $q.reject(rejection);
    }
  };
}]);