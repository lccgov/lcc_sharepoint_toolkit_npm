(function (global) {
    "use strict";

    var LCC = global.LCC || {};
    LCC.Modules = LCC.Modules || {};
    LCC.Settings = LCC.Settings || {};

    LCC.Modules.DateRangeFilter = function () {
        this.start = function (element) {
            element.on('click', '.js-date-range-submit', function () {

                var startdate = LCC.Modules.GetDateFromString(element.find('.js-date-range-start').val());
                var enddate = LCC.Modules.GetDateFromString(element.find('.js-date-range-end').val());
                //moment.js
                var d = new Date();
                var today = LCC.Modules.FormatSearchDate(d);
                var start = LCC.Modules.FormatSearchDate(startdate) || "1900/1/1";
                var end = LCC.Modules.FormatSearchDate(enddate) || today;

                var queryString = "?startdate=" + start + "&enddate=" + end;
                var newsUrl = ( LCC.Settings.NewsUrl !== undefined ) ? LCC.Settings.NewsUrl : ((_spPageContextInfo.webServerRelativeUrl.length === 1) ? _spPageContextInfo.webServerRelativeUrl.substr(1) : _spPageContextInfo.webServerRelativeUrl) + "/news";                   
                window.location = newsUrl + queryString;
            });

        };
    };

    LCC.Modules.FormatSearchDate = function (rawDate) {
        if(!rawDate) {
            return;
        }

        var year = rawDate.getFullYear();
        var month = (rawDate.getMonth() + 1);
        var day = rawDate.getDate();

        return year + "/" + month + "/" + day;
    };

    LCC.Modules.GetDateFromString = function (date) {
        if(!date) {
            return;
        }

        // dates are in format dd/mm/yyyy
        var datebits = date.split('/');
        var newDate = new Date();
        newDate.setFullYear(datebits[2], datebits[1] -1, datebits[0]);

        return newDate;

    };

    global.LCC = LCC;
})(window);