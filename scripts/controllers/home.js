// <BEGIN FILE DESCRIPTION>
//  {
//    "description" : "Controller handling the login functionality."
//  }
// <END FILE DESCRIPTION>

'use strict';

var homeController = function ($scope, BookService) {
    $scope.bigData = {};
    $scope.bigData.breakfast = false;
    $scope.bigData.lunch = false;
    $scope.bigData.dinner = false;
    $scope.isCollapsed = false;
};

angular.module('app')
    .controller('HomeController', ['$scope', 'BookService', homeController]);