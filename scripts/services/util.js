'use strict';

var _UtilService = function ($http, $q, AppConfig) {

    function ensureUrl (segments, secure) {
        secure = !!secure;
        segments = segments ? [].concat(segments) : [];

        var url = segments.join('/');

        if (!/^https?\s*:\s*\/\//.test(url)) {
            var protocol = secure ? 'https://' : 'http://';
            url = protocol + url;
        }

        return url;
    }

    return {
        ensureUrl: ensureUrl
    }
};

angular.module('app.services.UtilService', [])
    .factory('UtilService', ['$http', '$q', 'AppConfig', _UtilService]);