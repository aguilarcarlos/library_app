'use strict';

var _AppConfig = function () {
    var _default = {
        api_key: '48rXl9ZG7dm0EAWez4Ls3LyFYVA0g8a4',
        api_url: 'http://api.demo.aguilarcarlos.com/content',
        base_url: 'http://api.demo.aguilarcarlos.com',
        paths: {
            book: 'books/{book_id}',
            books: 'books',
            categories: 'categories',
            category: 'categories/{category_id}'
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