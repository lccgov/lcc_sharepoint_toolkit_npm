(function (global, $) {
        'use strict'

	    var LCC = global.LCC || {};
	    LCC.Modules = LCC.Modules || {};

	    LCC.Modules.Survey = function () {
	        this.start = function (element) {
				
				LCC.Modules.Survey.ShowEasyDiv = function () {
					$('#panelEasy').show();
					document.getElementById('panelMain').style.display = "block";
					return true;
				}
				LCC.Modules.Survey.HideEasyDiv = function () {
					$('#panelEasy').hide();
					document.getElementById('panelMain').style.display = "block";
					return true;
				}
	
				LCC.Modules.Survey.ValidateForm = function () {
					var isEasyChecked = false;
					var radioButtonsEasy = document.getElementsByClassName('radEasy');

					for (var i = 0; i < radioButtonsEasy.length; i++) {
						if (radioButtonsEasy[i].checked) {
							isEasyChecked = true;							
							break;
						}
					}
					if (!isEasyChecked) {
						document.getElementById('lblEasyError').innerHTML = 'Please tell us how easy it was to find the information you were looking for';						
					}
					return isEasyChecked;
				}				
					
				$('#txtLookingFor').keyup(function () {
					var message = LCC.MaxCharacters.setMaxCharacters($(this), 500);					
					$(this).parent().find('.scopeNote').html(message);
				});
				
				$('#txtFurtherComments').keyup(function () {
					var message = LCC.MaxCharacters.setMaxCharacters($(this), 500);
					$(this).parent().find('.scopeNote').html(message);
				});

            }
        
        };

    global.LCC = LCC;
})(window, jQuery);