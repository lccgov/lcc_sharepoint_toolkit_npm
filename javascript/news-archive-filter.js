	(function (global) {
	    "use strict";

	    var LCC = global.LCC || {};
	    LCC.Modules = LCC.Modules || {};
		LCC.Settings = LCC.Settings || {};

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
	                var newsUrl = ( LCC.Settings.NewsUrl !== undefined ) ? LCC.Settings.NewsUrl : ((_spPageContextInfo.webServerRelativeUrl.length === 1) ? _spPageContextInfo.webServerRelativeUrl.substr(1) : _spPageContextInfo.webServerRelativeUrl) + "/news";                   
                	window.location = newsUrl + queryString;


	            });	            

	            function getArchiveMonths() {
	                var source = $("#archive-template").html();
	                var template = Handlebars.compile(source);

					var today = new Date();

					var years = [];
					var months = [];
					months.push({ 'month': 1, 'monthAsString': 'Jan' });
					months.push({ 'month': 2, 'monthAsString': 'Feb' });
					months.push({ 'month': 3, 'monthAsString': 'Mar' });
					months.push({ 'month': 4, 'monthAsString': 'Apr' });
					months.push({ 'month': 5, 'monthAsString': 'May' });
					months.push({ 'month': 6, 'monthAsString': 'Jun' });
					months.push({ 'month': 7, 'monthAsString': 'Jul' });
					months.push({ 'month': 8, 'monthAsString': 'Aug' });
					months.push({ 'month': 9, 'monthAsString': 'Sep' });
					months.push({ 'month': 10, 'monthAsString': 'Oct' });
					months.push({ 'month': 11, 'monthAsString': 'Nov' });
					months.push({ 'month': 12, 'monthAsString': 'Dec' });

					years.push({ 'year': today.getFullYear(), 'months': months });
					years.push({ 'year': today.getFullYear() - 1, 'months': months });
					years.push({ 'year': today.getFullYear() - 2, 'months': months });

					var html = template({ Years: years });
					$("#archive").html(html);

					LCC.modules.start($("#newsAccordion"));
				}				
				
	        };
	    };

	    global.LCC = LCC;
	})(window);