(function (global, $) {
        'use strict'

	    var LCC = global.LCC || {};
	    LCC.Modules = LCC.Modules || {};

	    LCC.Modules.PageComments = function () {
	        this.start = function (element) {

				var inDesignMode = document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode.value;

				if (inDesignMode != "1")
                {
					var nameInput = $("input[title='Name']");
					var emailInput = $("input[title='Email']");
					var commentsInput = $("textarea[title='Comments']");
					var furtherInput = $("textarea[title='Further']");

					$("#aspnetForm").validate();

					$(nameInput).rules("add", {
						required: true,
						maxlength: 50,
						messages:
						{
							required: "Please enter your name",
							maxlength: "Maximum number of characters is 50"
						}
					});

					$(emailInput).rules("add", {
					    email: true,
					    required: true,
					    messages:
					    {
					        email: "Please enter a valid email",
					        required: "Please enter your email address"
					    }
					});
					
					$(commentsInput).rules("add", {
						required: true,
						maxlength: 1000,
						messages:
						{
							required: "Please enter your comments",
							maxlength: "Maximum number of characters is 1000"
						}
					});
					
					$(commentsInput).rules("add", {
						maxlength: 1000,
						messages:
						{
							maxlength: "Maximum number of characters is 1000"
						}
					});
				}	

            }
        
        };

    global.LCC = LCC;
})(window, jQuery);