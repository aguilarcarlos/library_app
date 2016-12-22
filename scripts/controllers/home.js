'use strict';

var homeController = function ($scope, BookService) {
    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    $scope.active = 0;

  var slides = $scope.slides = [];
  var currIndex = 0;

    var newWidth = 600 + slides.length + 1;

    $scope.slides.push(
    {
        image: 'http://lorempixel.com/g/1200/400/city/1',
        text: 'The book demo n1',
        id: currIndex++
    },
    {
        image: 'http://lorempixel.com/g/1200/400/city/2',
        text: 'The book demo n2',
        id: currIndex++
    },
    {
        image: 'http://lorempixel.com/g/1200/400/city/3',
        text: 'The book demo n3',
        id: currIndex++
    });
};

angular.module('app')
    .controller('HomeController', ['$scope', 'BookService', homeController]);