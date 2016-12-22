'use strict';

var BookController = function ($scope, BookService, $log, $state, moment, $uibModal) {
    $scope.books = [];
    $scope.loaded = false;
    $scope.empty = false;
    $scope.alerts = [];

    function getBooks () {
        BookService.getBooks()
            .then(function (data) {
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

    function deleteBook (book_id) {
        $scope.loaded = false;
        BookService.deleteBook(book_id)
            .then(function (data) {
                $scope.loaded = true;
                $state.go('books.index', {}, { reload: true });
            })
            .catch(function (err) {
                $alerts.push({
                    type: 'danger',
                    message: 'Something went wrong deleting the user.'
                })
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

    // API
    $scope.removeBook = function (id) {

        if (!id) {
            return;
        }

        deleteBook(id);
    };

    $scope.editBook = function () {
        $state.go('home.index');
    };

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
    .config(['$qProvider', function ($qProvider) {
        $qProvider.errorOnUnhandledRejections(false);
    }])
    .controller('BookController', [
        '$scope',
        'BookService',
        '$log',
        '$state',
        'moment',
        '$uibModal',
        BookController]);