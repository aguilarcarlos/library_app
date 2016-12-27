'use strict';

var _BookService = function ($http, $q, AppConfig, UtilService, _, $cacheFactory) {

    var Resources = {
            books: UtilService.ensureUrl([
                AppConfig.api_url,
                AppConfig.paths.books
            ]),
            book: UtilService.ensureUrl([
                AppConfig.api_url,
                AppConfig.paths.book
            ])
        },
        $httpDefaultCache = $cacheFactory.get('$http');

    function getBook (bookId, opts) {
        var defer = $q.defer(),
            options = _.merge({
                cache: true
            }, !_.isObject(opts) ? {} : opts);

        if (!bookId) {
            defer.reject('Invalid Id');
            return defer.promise;
        }

        var url = Resources.book.replace('{book_id}', bookId);

        if (options.refresh) {
            $httpDefaultCache.remove(url);
        }

        $http.get(url, options)
            .then(function (book) {
                book = book.data || {};

                if (book.error || !book.data.length) {
                    defer.reject(book.message);
                    return defer.promise;
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

        if (options.refresh) {
            $httpDefaultCache.remove(Resources.books);
        }

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
                    defer.reject(response.data.join(' ') || response.message);
                    return defer.promise;
                }

                defer.resolve(response.message);
            }, function (err) {
                if (err.data && err.data.error) {
                    defer.reject(err.data.message);
                    return defer.promise;
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
            defer.reject('Invalid Id');
            return defer.promise;
        }

        var url = Resources.book.replace('{book_id}', book_id);

        $http.delete(url, options)
            .then(function (response) {
                response = response.data || {};

                if (response.error) {
                    defer.reject(response.message);
                    return defer.promise;
                }

                defer.resolve(response.message);
            }, function (err) {
                if (err.data && err.data.error) {
                    defer.reject(error.message);
                    return defer.promise;
                }

                defer.reject(err);
            })
            .catch(function (error) {
                defer.reject(error);
            });

        return defer.promise;
    }

    function updateBook (book_id, data, opts) {
        var defer = $q.defer(),
            options = _.merge({
                cache: true
            }, !_.isObject(opts) ? {} : opts);

        if (!book_id) {
            defer.reject('Invalid Id');
            return defer.promise;
        }

        var url = Resources.book.replace('{book_id}', book_id);

        $http.put(url, data, options)
            .then(function (response) {
                response = response.data || {};

                if (response.error) {
                    defer.reject(response.message);
                    return defer.promise;
                }

                defer.resolve(response.message);
            }, function (err) {
                if (err.data && err.data.error) {
                    defer.reject(error.message);
                    return defer.promise;
                }

                defer.reject(err);
            })
            .catch(function (error) {
                defer.reject(error);
            });

        return defer.promise;
    }

    function flushAll () {
        $httpDefaultCache.removeAll();
    }

    return {
        getBooks: getBooks,
        getBook: getBook,
        deleteBook: deleteBook,
        createBook: createBook,
        updateBook: updateBook,
        flushAll: flushAll
    };
};

angular.module('app.services.BookService', [])
    .factory('BookService', [
        '$http',
        '$q',
        'AppConfig',
        'UtilService',
        '_',
        '$cacheFactory',
        _BookService]);