'use strict';

var BookController = function (
    $scope,
    BookService,
    $log,
    $state,
    moment,
    SpinnerService,
    CategoryService,
    _
    ) {

    $scope.books = [];
    $scope.book = {};
    $scope.categories = [];
    $scope.loaded = false;
    $scope.empty = false;
    $scope.alerts = [];

    function loading (on) {
        $scope.loaded = !on;
        SpinnerService[on ? 'show' : 'hide']();
    }

    function getBooks () {
        loading(true);

        BookService.getBooks()
            .then(function (data) {
                loading(false);

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
        loading(true);

        BookService.deleteBook(book_id)
            .then(function (data) {
                loading(false);
                $state.go('books.index', {}, { reload: true });
            })
            .catch(function (err) {
                $scope.alerts.push({
                    type: 'danger',
                    message: 'Something went wrong deleting the user.'
                });
            });
    }

    function createBook (data) {
        loading(true);

        BookService.createBook(data)
            .then(function (response) {
                loading(false);
                $scope.alerts.push({
                    type: 'success',
                    message: response
                });
                $scope.book = {};
            })
            .catch(function (err) {
                loading(false);
                $scope.alerts.push({
                    type: 'danger',
                    message: err
                });
            });
    }

    function getBookDetails (bookId) {
        loading(true);

        BookService.getBook(bookId)
            .then(function (data) {
                loading(false);

                if (!data) {
                    $scope.empty = true;
                    return;
                }

                data.published_date = moment(data.published_date).format('LL');
                data.user = data.user || 'Not borrowed';

                $scope.bookDetails = data;
            })
            .catch(function (err) {
                $scope.empty = true;
            });
    }

    function getCategories () {
        loading(true);
        CategoryService.getCategories()
            .then(function (response) {
                loading(false);
                $scope.categories = response;
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    // DOM
    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.removeBook = function (id) {
        if (!id) {
            return;
        }

        deleteBook(id);
    };

    $scope.editBook = function (id) {
        $state.go('books.edit', { book_id: id });
    };

    $scope.openDatePicker = function() {
        $scope.picker.opened = true;
    };

    $scope.createBook = function(data) {
        console.log("submit", $scope.book);
        createBook(data);
    };

    function init () {
        $log.debug('BookController loaded...');

        switch ($state.current.name) {
            case 'books.index':
                getBooks();
                break;
            case 'books.detail':
                if ($state.params.book_id) {
                    getBookDetails($state.params.book_id);
                    return;
                }

                $state.go('books.index');
                break;
            case 'books.edit':
                if ($state.params.book_id) {
                    getCategories();
                    return;
                }
                break;
            case 'books.create':
                $scope.picker = {
                    opened: false
                };

                $scope.dateOptions = {
                    formatYear: 'yy',
                    maxDate: new Date(2020, 5, 22),
                    minDate: new Date(820, 5, 22),
                    startingDay: 1
                };

                getCategories();
                break;
            default:
                getBooks();
                break;
        }
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
        'SpinnerService',
        'CategoryService',
        '_',
        BookController]);