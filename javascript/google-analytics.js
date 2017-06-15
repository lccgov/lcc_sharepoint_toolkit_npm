(function (global, $) {
    "use strict";

    var LCC = global.LCC || {};
    LCC.GoogleAnalytics = LCC.GoogleAnalytics || {};

    $(function () {
        LCC.GoogleAnalytics.getListData();
        LCC.GoogleAnalytics.externalLinks();
    });

    LCC.GoogleAnalytics.getListData = function () {

        var hostUrl = document.location.protocol + "//" + document.location.host
        var listUrl = document.location.protocol + "//" + document.location.host + "/Lists/SharedElements/*"
        var url = hostUrl + "/_api/search/query?querytext='Title:\"GoogleAnalytics\"Path:\"" + listUrl + "\"'&QueryTemplatePropertiesUrl='spfile://webroot/queryparametertemplate.xml'"


        $.ajax({
            url: url,
            method: "GET",
            headers: {
                "Accept": "application/json; odata=verbose",
                "content-type": "application/json; odata=verbose",
            },
            success: LCC.GoogleAnalytics.onQuerySucceeded,
            error: LCC.GoogleAnalytics.onQueryFailed
        });
    }

    LCC.GoogleAnalytics.onQuerySucceeded = function (data) {

        var listItemInfo = '';

        $.each(data.d.results, function (key, value) {
            listItemInfo += value.SharedText;
        });

        $('#GoogleAnalytics').html(listItemInfo);

    }

    LCC.GoogleAnalytics.onQueryFailed = function () {
        console.log("Google analytics script not found");
    }


    LCC.GoogleAnalytics.externalLinks = function () {
        var filetypes = /\.(zip|exe|pdf|doc*|xls*|ppt*|mp3|mp4)$/i;

        $('a').each(function () {
            var link = $(this);
            var href = link.attr('href');
            var isExternal = new RegExp('^https?://');

            if (href && (!href.match(document.domain) && isExternal.test(href)) && !href.match('#') && !href.match(filetypes)) {
                link.click(function () {
                    if (!ga.loaded) {
                        document.location = href;

                    } else {
                        LCC.GoogleAnalytics.trackOutboundLink('outbound', 'click', href);
                    }
                    return false;
                });
            }
            else if (href && href.match(filetypes)) {
                link.click(function () {
                    var extension = (/[.]/.exec(href)) ? /[^.]+$/.exec(href) : undefined;
                    var filePath = href;
                    if (!ga.loaded) {
                        document.location = href;
                    } else {
                        LCC.GoogleAnalytics.trackOutboundLink('download', 'click-' + extension, filePath);
                    }
                    return false;
                });
            }
        });
    }

    LCC.GoogleAnalytics.trackOutboundLink = function (eventAction, eventLabel, url) {
        ga('send', 'event', eventAction, eventLabel, url,
            {
                'hitCallback':
                function () {
                    document.location = url;
                }
            });
    }

    global.LCC = LCC;
})(window, jQuery);