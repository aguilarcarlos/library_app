'use strict';

var CategoryController = function ($scope, CategoryService, $log, $state, UtilService) {
    $scope.categories = [];
    $scope.loaded = false;
    $scope.empty = false;

    function getCategoriesWithBooks () {
        CategoryService.getCategoriesWithBooks()
            .then(function (categories) {
                $scope.loaded = true;

                if (!categories.length) {
                    $scope.empty = false;
                }

                $scope.categories = categories;
            }).catch(function (err) {
                console.log(err);
            });
    }

    function init () {
        $log.debug("CategoryController loaded...");
        getCategoriesWithBooks();
    }

    init();
};

angular.module('app')
    .controller('CategoryController', [
        '$scope',
        'CategoryService',
        '$log',
        '$state',
        'UtilService',
        CategoryController]);