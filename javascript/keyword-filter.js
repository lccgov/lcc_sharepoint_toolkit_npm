(function (global) {
    "use strict";

    var LCC = global.LCC || {};
    LCC.Modules = LCC.Modules || {};

    LCC.Modules.KeywordFilter = function () {
        this.start = function (element) {
            element.on('click', '.js-keyword-submit', function () {
                var queryString = "?k=" + element.find('.js-keyword').val();
                window.location = window.location.protocol + '//' + window.location.host + window.location.pathname + queryString;
            });

        }
    };

    global.LCC = LCC;
})(window);