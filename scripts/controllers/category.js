'use strict';

var CategoryController = function ($scope, CategoryService, $log, $state, UtilService, SpinnerService) {
    $scope.categories = [];
    $scope.empty = false;
    $scope.loading = SpinnerService.isVisible();

    function getCategoriesWithBooks () {
        SpinnerService.show();

        CategoryService.getCategoriesWithBooks()
            .then(function (categories) {
                SpinnerService.hide();

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
        'SpinnerService',
        CategoryController]);