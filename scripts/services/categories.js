'use strict';

var _CategoryService = function ($http, $q, AppConfig, UtilService, _) {

    var Resources = {
        categories: UtilService.ensureUrl([
            AppConfig.api_url,
            AppConfig.paths.categories
        ]),
        category: UtilService.ensureUrl([
            AppConfig.api_url,
            AppConfig.paths.category
        ]),
        categoryAndBooks: UtilService.ensureUrl([
            AppConfig.api_url,
            AppConfig.paths.book_and_category
        ])
    };

    return {
        getCategories: function (opts) {
            var defer = $q.defer(),
                options = _.merge({
                    cache: true
                }, !_.isObject(opts) ? {} : opts);

            $http.get(Resources.categories, options)
                .then(function (categories) {
                    categories = categories.data || {};

                    if (categories.error) {
                        return defer.reject(categories.message);
                    }

                    defer.resolve(categories.data);
                }, function (err) {
                    if (err.data && err.data.error) {
                        return defer.reject(error.message);
                    }

                    defer.reject(err);
                });

            return defer.promise;
        },

        getCategoriesWithBooks: function (opts) {
            var defer = $q.defer(),
                options = _.merge({
                    cache: true
                }, !_.isObject(opts) ? {} : opts);

            $http.get(Resources.categoryAndBooks, options)
                .then(function (categories) {
                    categories = categories.data || {};

                    if (categories.error) {
                        return defer.reject(categories.message);
                    }

                    defer.resolve(categories.data);
                }, function (err) {
                    if (err.data && err.data.error) {
                        return defer.reject(error.message);
                    }

                    defer.reject(err);
                });

            return defer.promise;
        }
    };
};

angular.module('app.services.CategoryService', [])
    .factory('CategoryService', [
        '$http',
        '$q',
        'AppConfig',
        'UtilService',
        '_',
        _CategoryService]);