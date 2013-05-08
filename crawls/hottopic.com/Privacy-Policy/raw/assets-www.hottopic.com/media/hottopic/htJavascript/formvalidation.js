/*
* Below is sample usage to setup validVal for a form.
* In this example the form id is contact_us.  We are
* checking to see if it is there and then call
* formvalidation.setValidVal(<form>) to setup validVal.

$(document).ready(function() {
	//do this only if the form exists
	if($("#contact_us").length > 0){
		//setup validVal for this page
		formvalidation.setValidVal($("#contact_us"));
	}
});*/

//formvalidation namespace, has methods to setup validval plugin
(function( formvalidation, $, undefined ) {

	//public method to get products
	formvalidation.setValidVal = function(theForm){
        theForm.validVal({
            fields: {
                onInvalid: function($form) {
                $(this).addClass("invalid");
                $(this).click(function() {
                     $(this).next().stop().fadeIn();
                    });
                },
                onValid: function($form) {
                    $(this).removeClass("invalid");
                    $(this).next().stop().hide();
                    $("form .invalid:first").next(".error").slice(0).show();
                    $(this).click(function() {
                        $(this).next(".error").hide();
                    });
                }
            },
            form: {
                onInvalid: function(field_arr) {
                    $(".error-msg").slideDown(function() {
                        $(this).fadeIn(3000);
                        });
                    theForm.find(".error").hide().filter(':lt(0)').show();
                    $(".error").prev(".invalid").blur(function() {
                        $(".error:first").hide();
                        });
                    $("form").find(".invalid").next(".error").slice(0,1).show();
                },
                onValid: function($form) {
                    $("form .error").slice(0,1).hide();
                    }
            },

            customValidations: {
	            "phoneNumber": function( val ) {
                    var testval = $.trim(val);
                    if (testval != '' && testval.length > 0 ) {
                        var cleanString = testval.replace(/[()-]/g, "");
                        if(cleanString.length < 10 || isNaN(cleanString)){
                            return false;
                        }else{
                            return true;
                        }
                    } else {
                        return true;
                    }
                }
            }
        });
	};

    //function to hide error div on blur - can take config object
    //{"excludeElementByIdOrSelector": ["#recaptcha_response_field","input[name=submit_contact_form]"]}
    formvalidation.enableHideErrorOnBlur = function(config){
        var elementToExclude, hasExclusions = false;

        if(typeof config !== 'undefined') {
            if(config.excludeElementByIdOrSelector.length > 0){
                hasExclusions = true;
                elementToExclude = config.excludeElementByIdOrSelector;
            }
        }

        $("input,select").blur(function() {
            $(this).next(".error").hide();
            });

        if(typeof elementToExclude !== 'undefined'){
            if($.isArray(elementToExclude)){
                $.each(elementToExclude, function (idx, item){
                    $(item).unbind("blur");
                });
            }else{
                $(elementToExclude).unbind("blur");
            }
            //elementToExclude.unbind("blur");
        }
    };

    //function to add arrow tip div
    formvalidation.addArrowTip = function(){
        //show arrow to tooltip message
        $(".tip").append("<div class='tiparrow'></div>");
    }

}( window.formvalidation = window.formvalidation || {}, jQuery ));