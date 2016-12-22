'use strict';

var BookController = function ($scope, BookService, $log, $state, moment) {
    $scope.books = [];
    $scope.loaded = false;
    $scope.empty = false;

    function getBooks () {
        BookService.getBooks().then(function (data) {
            $scope.loaded = true;

            if (!data.length) {
                $scope.empty = true;
                return;
            }

            $scope.books = data;
        }).catch(function (err) {
            $scope.empty = true;
        });
    }

    function getBookDetails (bookId) {
        BookService.getBook(bookId).then(function (data) {
            $scope.loaded = true;

            if (!data) {
                $scope.empty = true;
                return;
            }

            data.published_date = moment(data.published_date).format('LL');
            data.user = data.user || 'Not borrowed';

            $scope.bookDetails = data;
        }).catch(function (err) {
            $scope.empty = true;
        });
    }

    function init () {
        $log.debug("BookController loaded...");

        if ($state.params.book_id) {
            getBookDetails($state.params.book_id);
            return;
        }

        getBooks();
    }

    init();
};

angular.module('app')
    .controller('BookController', [
        '$scope',
        'BookService',
        '$log',
        '$state',
        'moment',
        BookController]);