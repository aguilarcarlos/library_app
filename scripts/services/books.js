'use strict';

var _BookService = function ($http, $q, AppConfig, UtilService, _) {

    var Resources = {
        books: UtilService.ensureUrl([
            AppConfig.api_url,
            AppConfig.paths.books
        ]),
        book: UtilService.ensureUrl([
            AppConfig.api_url,
            AppConfig.paths.book
        ])
    };

    function getBook (bookId, opts) {
        var defer = $q.defer(),
            options = _.merge({
                cache: true
            }, !_.isObject(opts) ? {} : opts);

        if (!bookId) {
            defer.reject('Invalid Id');
        }

        var url = Resources.book.replace('{book_id}', bookId);

        $http.get(url, options)
            .then(function (book) {
                book = book.data || {};

                if (book.error || !book.data.length) {
                    return defer.reject(book.message);
                }

                defer.resolve(book.data[0]);

            }, function (err) {
                if (err.data && err.data.error) {
                    return defer.reject(error.message);
                }

                defer.reject(err);
            })
            .catch(function (error) {
                defer.reject(error);
            });

        return defer.promise;
    }

    function getBooks (opts) {
        var defer = $q.defer(),
            options = _.merge({
                cache: true
            }, !_.isObject(opts) ? {} : opts);

        $http.get(Resources.books, options)
            .then(function (books) {
                books = books.data || {};

                if (books.error) {
                    return defer.reject(books.message);
                }

                defer.resolve(books.data);
            }, function (err) {
                if (err.data && err.data.error) {
                    return defer.reject(error.message);
                }

                defer.reject(err);
            })
            .catch(function (error) {
                defer.reject(error);
            });

        return defer.promise;
    }

    function createBook (data, opts) {
        var defer = $q.defer(),
            options = _.merge({}, !_.isObject(opts) ? {} : opts);

        $http.post(Resources.books, data, options)
            .then(function (response) {
                response = response.data || {};

                if (response.error) {
                    return defer.reject(response.data.join(' ') || response.message);
                }

                defer.resolve(response.message);
            }, function (err) {
                if (err.data && err.data.error) {
                    return defer.reject(err.data.message);
                }

                defer.reject(err);
            })
            .catch(function (error) {
                defer.reject(error);
            });

        return defer.promise;
    }

    function deleteBook (book_id, opts) {
        var defer = $q.defer(),
            options = _.merge({
                cache: true
            }, !_.isObject(opts) ? {} : opts);

        if (!book_id) {
            return defer.reject('Invalid Id');
        }

        var url = Resources.book.replace('{book_id}', book_id);

        $http.delete(url, options)
            .then(function (response) {
                response = response.data || {};

                if (response.error) {
                    return defer.reject(response.message);
                }

                defer.resolve(response.message);
            }, function (err) {
                if (err.data && err.data.error) {
                    return defer.reject(error.message);
                }

                defer.reject(err);
            })
            .catch(function (error) {
                defer.reject(error);
            });

        return defer.promise;
    }

    return {
        getBooks: getBooks,
        getBook: getBook,
        deleteBook: deleteBook,
        createBook: createBook
    };
};

angular.module('app.services.BookService', [])
    .factory('BookService', [
        '$http',
        '$q',
        'AppConfig',
        'UtilService',
        '_',
        _BookService]);