(function (global) {
    "use strict";

    var LCC = global.LCC || {};
    LCC.Modules = LCC.Modules || {};
    LCC.Settings = LCC.Settings || {};

    LCC.Modules.KeywordFilter = function () {
        this.start = function (element) {
            element.on('click', '.js-keyword-submit', function () {
                var queryString = "?k=" + element.find('.js-keyword').val();
                var newsUrl = ( LCC.Settings.NewsUrl !== undefined ) ? LCC.Settings.NewsUrl : "/Pages/News.aspx";                   
                window.location = newsUrl + queryString;
            });

        }
    };

    global.LCC = LCC;
})(window);