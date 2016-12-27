'use strict';

var BookController = function (
    $scope,
    BookService,
    $log,
    $state,
    moment,
    SpinnerService,
    CategoryService,
    _,
    $uibModal,
    $stateParams,
    he
    ) {
    $scope.books = [];
    $scope.book = {};
    $scope.categories = [];
    $scope.loaded = false;
    $scope.empty = false;
    $scope.alerts = [];
    $scope.editBook = {};

    if ($stateParams.status === 'updated') {
        $scope.alerts.push({
            type: 'success',
            message: 'Book updated correctly'
        });
    }

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
                BookService.flushAll();
                loading(false);
                $state.go('books.index', {}, { reload: true });
            })
            .catch(function (err) {
                SpinnerService.hide();
                $scope.alerts.push({
                    type: 'danger',
                    message: 'Something went wrong deleting the user.'
                });
            });
    }

    function createBook (data, goBook) {
        loading(true);

        BookService.createBook(data)
            .then(function (response) {
                loading(false);
                $scope.book = {};
                BookService.flushAll();

                if (goBook) {
                    $log.info('Saving and going to books...');
                    $state.go('books.index', {}, {reload: true });
                    return;
                }

                $scope.alerts.push({
                    type: 'success',
                    message: response
                });
            })
            .catch(function (err) {
                SpinnerService.hide();
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

                data.name = he.decode(data.name);
                data.author = he.decode(data.author);
                data.user = he.decode(data.user);

                data.published_date = moment(data.published_date).format('LL');
                data.available = !!!data.user;
                $scope.bookDetails = data;
            })
            .catch(function (err) {
                SpinnerService.hide();
                $scope.empty = true;

                $scope.alerts.push({
                    type: 'danger',
                    message: err
                });
            });
    }

    function updateBook (book_id, data, goBook) {
        loading(true);
        BookService.updateBook(book_id, data)
            .then(function (response) {
                loading(false);
                $scope.current = {};
                $scope.book = {};
                BookService.flushAll();

                if (goBook) {
                    $log.info('Updating and going to books...');
                    $state.go('books.index', {}, {reload: true });
                    return;
                }

                $state.go($state.current, {status: 'updated'}, {reload: true });
            })
            .catch(function (err) {
                SpinnerService.hide();

                $scope.alerts.push({
                    type: 'danger',
                    message: 'Something wrong has happened with the book: ' + err
                });
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
                SpinnerService.hide();
                $scope.empty = true;

                $scope.alerts.push({
                    type: 'danger',
                    message: err
                });
            });
    }

    function editBookPage (id) {
        loading(true);
        BookService.getBook(id)
            .then(function (data) {
                CategoryService.getCategories()
                    .then(function (categories) {
                        loading(false);
                        data.name = he.decode(data.name);
                        data.author = he.decode(data.author);
                        data.user = he.decode(data.user);

                        $scope.current = data;
                        $scope.current.published_date = new Date($scope.current.published_date);
                        $scope.categories = categories;



                        // Add prepared model
                        $scope.book.user = $scope.current.user;
                        $scope.book._id = $scope.current._id;
                    })
                    .catch(function (err) {
                        SpinnerService.hide();
                        $scope.empty = true;

                        $scope.alerts.push({
                            type: 'danger',
                            message: 'Something went wrong'
                        });
                    });
            })
            .catch(function (err) {
                SpinnerService.hide();
                $scope.empty = true;

                $scope.alerts.push({
                    type: 'danger',
                    message: 'Something went wrong'
                });
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

    $scope.createBook = function(data, goBook) {
        goBook = !!goBook;
        createBook(data, goBook);
    };

    $scope.updateBook = function (data, goBook) {
        goBook = !!goBook;
        updateBook(data._id, data, goBook);
    };

    $scope.openModal = function (size, data) {
        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            controller: 'ModalController',
            templateUrl: '/partials/directives/modalAvailability',
            size: size,
            resolve: {
                book: function () {
                    return data;
                }
            }
        });

        modalInstance.result.then(function (bookUpdated) {
            $state.go($state.current, {status: 'updated'}, {reload: true});
        }, function () {
            $log.debug('Dismiss modal');
        });
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
                    editBookPage($state.params.book_id);
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
        '$uibModal',
        '$stateParams',
        'he',
        BookController])

    .controller('ModalController', [
        '$scope',
        'BookService',
        '$log',
        'book',
        'he',
        '$uibModalInstance',
        function ($scope, BookService, $log, book, he, $uibModalInstance) {
            book.name = he.decode(book.name);
            book.author = he.decode(book.author);
            book.user = he.decode(book.user);
            $scope.book = book;
            $scope.alerts = [];

            $scope.update = function () {
                if ($scope.book.setAvailable === 1) {
                    $scope.book.user = '';
                }

                if ($scope.book.setAvailable === 0 && !$scope.book.user) {
                    $scope.alerts.push({
                        type: 'danger',
                        message: 'You MUST enter a name'
                    });
                    return;
                }

                BookService.updateBook($scope.book._id, $scope.book)
                    .then(function (response) {
                        BookService.flushAll();
                        $uibModalInstance.close($scope.book);
                    })
                    .catch(function (err) {
                        $scope.alerts.push({
                            type: 'danger',
                            message: 'Something wrong has happened with the book'
                        });
                    });
            };

            $scope.closeAlert = function (index) {
                $scope.alerts.splice(index, 1);
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        }]);