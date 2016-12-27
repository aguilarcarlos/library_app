'use strict'

var _gridBook = function (_, UtilService, $rootScope) {

    function linker ($scope, element, attrs) {
        $scope.rows = UtilService.createRows($scope.items);
        $rootScope.mode = attrs.mode || 'complete';
    }

    return {
        restrict: 'E',
        scope: {
            items: '=',
            search: '='
        },
        templateUrl: function () {
            return 'app-templates/gridbook';
        },
        replace: true,
        link: linker
    };
};

var _gridBookItem = function () {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
            bookid: '@'
        },
        templateUrl: function () {
            return 'app-templates/gridbookItem';
        }
    };
};

var _gridBookData = function (moment, $rootScope, he) {
    function linker ($scope, elem, attr) {
        // Fomat date before render
        $scope.data.published_date = moment($scope.data.published_date).format('LL');
        $scope.data.available = !!!$scope.data.user;

        $scope.data.name = he.decode($scope.data.name);
        $scope.data.author = he.decode($scope.data.author);
        $scope.data.user = he.decode($scope.data.user);
    }

    return {
        restrict: 'E',
        replace: true,
        scope: {
            data: '=',
        },
        templateUrl: function (elem, attrs) {
            var mode = $rootScope.mode || 'complete';
            switch(mode) {
                case 'title':
                case 'poster':
                    return 'app-templates/gridbookPoster';
                case 'complete':
                    return 'app-templates/gridbookData';
                default:
                    return 'app-templates/gridbookData';
            }
        },
        link: linker
    };
};

angular.module('app.components.books.grid', [])
    .run([
        '$templateCache',
        function ($templateCache) {
            var template_gridbook = '\
                <div class="row" ng-repeat="row in rows"> \
                    <div ng-repeat="item in row.items | filter:search as results">\
                        <grid-book-item bookid="{{ item._id }}">\
                            <grid-book-data\
                                data="item"\
                        </grid-book-item>\
                    </div>\
                </div>';

            var template_gridbookItem = '\
                <div class="col-md-2 fadeIn animated">\
                    <div class="thumbnail card-link">\
                        <a ui-sref="books.detail({ book_id: bookid })">\
                            <ng-transclude></ng-transclude>\
                        </a>\
                    </div>\
                </div>';

            var template_gridbookData = '\
                <div>\
                    <img ng-src="{{ data.poster }}" alt="{{ data.name }}" style="width:100%">\
                    <div class="caption">\
                        <h5>{{ data.name }}<br><small>{{ data.author }}</small></h5>\
                        <p>\
                            <strong>Category:</strong><br /><span class="label label-primary">{{ data.category }}</span><br />\
                            <strong>Date Published:</strong><br />{{ data.published_date }}<br />\
                            <span ng-if="data.available"><strong>Status:</strong><br /><span class="label label-success">Available</span></span>\
                            <span ng-if="!data.available">\
                                <strong>Status:</strong><br /><span class="label label-default">No available</span><br>\
                                <strong>User:</strong><br />{{ data.user }}\
                            </span>\
                        </p>\
                    </div>\
                </div>';

            var template_gridbookPoster = '\
                <div>\
                    <img ng-src="{{ data.poster }}" alt="{{ data.name }}" style="width:100%">\
                    <div class="caption">\
                        <h5>{{ data.name }}</h5>\
                    </div>\
                </div>';

        $templateCache.put('app-templates/gridbook', template_gridbook);
        $templateCache.put('app-templates/gridbookItem', template_gridbookItem);
        $templateCache.put('app-templates/gridbookData', template_gridbookData);
        $templateCache.put('app-templates/gridbookPoster', template_gridbookPoster);
    }])
    .directive('gridBook', ['_', 'UtilService', '$rootScope', _gridBook])
    .directive('gridBookItem', [_gridBookItem])
    .directive('gridBookData', ['moment', '$rootScope', 'he', _gridBookData]);


