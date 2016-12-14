(function (global) {
    "use strict";

    var LCC = global.LCC || {};
    LCC.Modules = LCC.Modules || {};

    LCC.Modules.DateRangeFilter = function () {
        this.start = function (element) {
            element.on('click', '.js-date-range-submit', function () {

                var startdate = element.find('.js-date-range-start').val();
                var enddate = element.find('.js-date-range-end').val();
                //moment.js
                var d = new Date();
                var mm = d.getMonth() + 1;
                var dd = d.getDate();
                var yyyy = d.getFullYear();
                var today = yyyy + "/" + mm + "/" + dd;
                var start = startdate || "1900/1/1";
                var end = enddate || today;

                var queryString = "?startdate=" + start + "&enddate=" + end;
                window.location = window.location.protocol + '//' + window.location.host + window.location.pathname + queryString;
            });

        }
    };

    global.LCC = LCC;
})(window);