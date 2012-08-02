/************************* Ratting Module Js Code *******************************/
//Create Global Object
var bc = bc || {}; 

( function( window, bc, $, undefined ) {
	/**
	 * User Registration module
	 */
	bc.userRegistration = (function(){
		function _userRegistration(){
			//Global variables	
			var context = this, iframeURL = "";
			
			var init = function(){
				var registrationDialogCssId = "registrationDialogStyle";
				if(!$('#'+registrationDialogCssId)[0]){
					var head  = document.getElementsByTagName('head')[0], link = document.createElement('link');
					link.id = registrationDialogCssId;
					link.href =  "/Shared/Registration/CSS/registrationDialogNew.css";
					link.rel  = 'stylesheet';
					link.type = 'text/css';
					head.appendChild(link);
				}				
				$('#registrationDialogDiv').dialog({
					autoOpen: false,
					closeOnEscape: false,
					draggable: false,
					resizable: false,
					modal: true,
					width: 'auto',
					height: '264',
					dialogClass: 'VariableWidth VariableWidth-ui-dialog registrationDialogClass'
				});
				$('.registrationDialogClass .ui-dialog-titlebar .ui-dialog-titlebar-close').unbind('click');
				$('.registrationDialogClass .ui-dialog-titlebar .ui-dialog-titlebar-close').bind('click', function(evt){
					evt.preventDefault();
					context.closeRegistartionDialog();
				});
				var iframe = $('#registrationDialogDiv').find('iframe');
				context.iFrameURL = iframe.attr('src');

			};
			
			//Style, and Open registration dialog window
			this.openRegistartionDialog = function(){
                //TODO:Check why was this added.
                //$(".ui-dialog-content").dialog("close");
                modalUrl = jQuery("#hdnModalRegistrationUrl").val();
				var iframe = $('#registrationDialogDiv').find('iframe');
                iframe.attr('src',modalUrl);                
				iframe.attr('width', 0);
				iframe.attr('height', 0);
				//iframe.css('backgroundColor', '#ffffff');
				$('#registrationDialogDiv').dialog("open");
                $('.ui-dialog').css('z-index',99999);
                $('.ui-widget-overlay').css('z-index',99998);

               
			};

            this.closeRegistartionDialog = function(){	
            document.cookie = "WtSinParameter=;path=/;expires=0;";			
                jQuery('#registrationDialogDiv').dialog("close");
				$('#registrationDialogDiv').find('.registrationDialogIframe').attr({
					"height": "0",
                    "width": "0",
					"src": context.iFrameURL
				}).css({'height': '0' + "px", 'width': '0' + "px"});
            };
			
			//Main function for cross domain communication
			this.invokeCdAccessJsFuction = function(url){
				if (url != "") {
					var params = context.getURLParam(url), heightPaddingContent = 10, lastHeight = parseInt(params[0],10), topPosition = 0, closeWindowStatus = params[3].toString(), dialogWidth = parseInt(params[4], 10), widthPadding = 20;					
					if(closeWindowStatus == 'false'){
                       if (lastHeight > 0) {
						    $('.registrationDialogClass').css({
							    'height' : (heightPaddingContent + lastHeight) + "px",
                                'width' : (widthPadding + dialogWidth) + "px"
						    }).find('iframe.registrationDialogIframe').css({'height': lastHeight + "px", 'width': dialogWidth + "px"});
					    }

                    

					    if (params.length > 3) {
						    if (params[1].toString() == 'true') {							
							    context.closeRegistartionDialog();
							    if (params[2].length > 0 && typeof params[2] != 'undefined') {
							       window.location.href = params[2];							   
							    } else {
								    window.location.href = window.location.href;
							    }
						    }
					    }
                    } else{
                        context.closeRegistartionDialog();
                    }
                     if (dialogWidth > 400){
                       leftPosition = ($(window).width() - dialogWidth) / 2 + "px";
                       $('.registrationDialogClass').css("left", leftPosition);
                      }
				}

                 
			};

			this.getURLParam = function(strHref){
				var params = [];
				if (strHref.indexOf("?") > -1) {
					var strQueryString = strHref.substr(strHref.indexOf("?")).toLowerCase();
					var aQueryString = strQueryString.split("&");
					for(var iParam = 0; iParam < aQueryString.length; iParam++) {           
						var aParam = aQueryString[iParam].split("=");
						params[iParam] = aParam[1];     
					}
				}
				return params;
			};
			
			$(function() {
				init();
			});
			
			return this;
		};
		
		return new _userRegistration();
	}());
}(window, bc, jQuery))