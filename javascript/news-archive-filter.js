	(function (global) {
	    "use strict";

	    var LCC = global.LCC || {};
	    LCC.Modules = LCC.Modules || {};

	    LCC.Modules.NewsArchiveFilter = function () {
	        this.start = function (element) {

				getArchiveMonths();
			
	            element.on('click', '.js-news-archive-filter-submit', function () {

	                var year = $(this).data('year');
	                var month = $(this).data('month');

	                var d = new Date(year, month, 0);
	                var start = year + "/" + month + "/1";
	                var end = year + "/" + month + "/" + d.getDate();

	                var queryString = "?startdate=" + start + "&enddate=" + end;
	                window.location = window.location.protocol + '//' + window.location.host + window.location.pathname + queryString;


	            });	            

	            function getArchiveMonths() {
	                var source = $("#archive-template").html();
	                var template = Handlebars.compile(source);

                    $.ajax({
	                    url: _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getbytitle('pages')/items?$select=LCCMonthYear&$filter=ContentType eq 'Breeze News Article Page'&$orderby=Created desc",
	                    type: "GET",
	                    dataType: 'json',
	                    headers: {
	                        "accept": "application/json;odata=verbose"
	                    },
	                    success: function (data) {

	                        var prevYear;
	                        var prevMonth;
	                        var years = [];
	                        var monthsString = ['None', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

	                        $.each(data.d.results, function (index, item) {

	                            if (typeof prevMonth === 'undefined' || prevMonth != item.LCCMonthYear) {

	                                var itemYear = item.LCCMonthYear.substring(0, 4);
	                                var itemMonth = item.LCCMonthYear.substring(4);
	                                var monthAsString = monthsString[itemMonth];

	                                if (typeof prevYear === 'undefined' || prevYear != itemYear) {
	                                    years.push({ 'year': itemYear, 'months': [{ 'month': itemMonth, 'monthAsString': monthAsString }] });
	                                    prevYear = itemYear;
	                                }
	                                else {
	                                    years[years.length - 1].months.push({ 'month': itemMonth, 'monthAsString': monthAsString });
	                                }
	                                prevMonth = item.LCCMonthYear;
	                            }
	                        });

	                        var html = template({ Years: years });
	                        $("#archive").html(html);

	                    },
	                    error: function (err) {
	                        var html = "<p>Sorry, there is an error with this filter</p>";
	                        $("#archive").html(html);
	                    }
	                });
	            }			
				
	        }
	    };

	    global.LCC = LCC;
	})(window);