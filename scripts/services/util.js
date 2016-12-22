'use strict';

var _UtilService = function ($http, $q) {

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

    function createRows (items, limitPerRow) {
        limitPerRow = limitPerRow || 6;

        var segments = _.chunk(items, limitPerRow),
            segmentsLen = segments.length,
            rows = [];

        for (var i = 0; i < segmentsLen; i++) {
            rows.push({items: segments[i]});
        }

        return rows;
    }

    return {
        ensureUrl: ensureUrl,
        createRows: createRows
    }
};

angular.module('app.services.UtilService', [])
    .factory('UtilService', ['$http', '$q', _UtilService]);