'use strict';

var _BookService = function ($http, $q, AppConfig, UtilService) {

    return {
        getAllBooks: function () {
            return $http.get(UtilService.ensureUrl(AppConfig.base_url), {cache: true})
                .then(function (response) {
                    return response.data;
                }, function (failure) {
                    return failure.data;
                });
        }
    }
};

angular.module('app.services.BookService', [])
    .factory('BookService', ['$http', '$q', 'AppConfig', 'UtilService', _BookService]);