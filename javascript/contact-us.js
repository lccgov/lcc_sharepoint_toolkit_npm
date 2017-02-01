(function (global, $) {
        'use strict'

	    var LCC = global.LCC || {};
	    LCC.Modules = LCC.Modules || {};

	    LCC.Modules.ContactUs = function () {
	        this.start = function (element) {

				var inDesignMode = document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode.value;

				if (inDesignMode != "1")
{
					var nameInput = $("input[title='Name']");
					var emailInput = $("input[title='Email']");
					var messageInput = $("textarea[title='Message']");

					$("#aspnetForm").validate();

					$(nameInput).rules("add", {
						required: true,
						messages:
						{
							required: "Please enter your name"
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
					
					$(messageInput).rules("add", {
						required: true,
						maxlength: 1000,
						messages:
						{
							required: "Please enter your comments",
							maxlength: "Maximum number of characters is 1000"
						}
					});
				}	

            }
        
        };

    global.LCC = LCC;
})(window, jQuery);