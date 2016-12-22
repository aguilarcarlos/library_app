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

    return {
        getBooks: function (opts) {
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
                });

            return defer.promise;
        },

        getBook: function (bookId, opts) {
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
                });

            return defer.promise;
        },

        getBooksByCategory: function (category_id, opts) {}
    }
};

angular.module('app.services.BookService', [])
    .factory('BookService', [
        '$http',
        '$q',
        'AppConfig',
        'UtilService',
        '_',
        _BookService]);