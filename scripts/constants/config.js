'use strict';

var _AppConfig = function () {
    var _default = {
        api_key: '48rXl9ZG7dm0EAWez4Ls3LyFYVA0g8a4',
        api_url: 'https://api.demo.aguilarcarlos.com/content',
        base_url: 'https://api.demo.aguilarcarlos.com',
        paths: {
            book_and_category: 'category/book',
            book: 'books/{book_id}',
            books_category: '/books/category/{category_id}',
            books: 'books',
            category: 'categories/{category_id}',
            category_books: 'categories/{category_id}/books',
            categories: 'categories'
        }
    };

    return {
        set: function (values) {
            angular.extend(_default, values)
        },
        $get: function () {
            return _default;
        }
    }
};

angular.module('app')
    .provider('AppConfig', [_AppConfig]);