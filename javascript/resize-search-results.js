(function (global, $) {
    "use strict";
    var LCC = global.LCC || {};
	    LCC.SearchResults = LCC.SearchResults || {};

    $(global).on('load', function () {
        LCC.SearchResults.resizeSearchResults();
    });

    $(global).resize(function () {
        LCC.SearchResults.resizeSearchResults();
    });        

    LCC.SearchResults.resizeSearchResults = function () {
        var browserViewport = $(window).width();
        if (browserViewport <= 992) {
            $(".relDate").prependTo(".eventsFilterType.first");
        }
        if (browserViewport > 992) {
            $('.relDate').appendTo('.eventsSearchSort .pull-right');
        }
    }

    global.LCC = LCC;

})(window, jQuery);