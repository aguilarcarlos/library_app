'use strict';

var _ConfigurationService = function ($http, $q, AppConfig, UtilService) {
    return {
        getConfig: function () {
            return $http.get(UtilService.ensureUrl(AppConfig.base_url), {cache: true})
                .then(function (response) {
                    if (!response.data.data || !response.data.data.length) {
                        return response.data;
                    }

                    return response.data.data[0];
                }, function (failure) {
                    return failure.data;
                });
        }
    }
};

angular.module('app.services.ConfigurationService', [])
    .factory('ConfigurationService', ['$http', '$q', 'AppConfig', 'UtilService', _ConfigurationService]);