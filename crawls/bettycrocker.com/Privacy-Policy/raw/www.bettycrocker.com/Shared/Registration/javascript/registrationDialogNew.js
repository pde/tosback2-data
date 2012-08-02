/************************* Ratting Module Js Code *******************************/
//Create Global Object
var bc = bc || {};

(function (window, bc, $, undefined) {
    /**
    * User Registration module
    */
    bc.userRegistration = (function () {
        function _userRegistration() {
            //Global variables	
            var context = this, iframeURL = ""; controlId = "";

            //ctor
            var init = function () {
                var registrationDialogCssId = "registrationDialogStyle";
                if (!$('#' + registrationDialogCssId)[0]) {
                    var head = document.getElementsByTagName('head')[0], link = document.createElement('link');
                    link.id = registrationDialogCssId;
                    link.href = "/Shared/Registration/CSS/registrationDialogNew.css";
                    link.rel = 'stylesheet';
                    link.type = 'text/css';
                    head.appendChild(link);
                }
                $('.registrationDialogDiv').dialog({
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
                $('.registrationDialogClass .ui-dialog-titlebar .ui-dialog-titlebar-close').bind('click', function (evt) {
                    evt.preventDefault();
                    context.closeRegistartionDialog();
                });

            };

            //Style, and Open registration dialog window
            this.openRegistartionDialog = function (controlId) {
                //remember the controlId so we can refer to it later
                context.controlId = controlId;

                //close all dialogs
                $(".ui-dialog-content").dialog("close");

                //get the url from the hidden field with mangled asp.net name
                var modalUrl = jQuery("input[id*="+controlId+"]").val();               
                              
                var requestPageUrl = window.location.href;
                if(requestPageUrl.indexOf("https") > -1)
                {
                   modalUrl = modalUrl.substring(0, modalUrl.indexOf("scheme=")) + "scheme=https" ;
                }

                //remember for later
                context.iFrameURL = modalUrl;

                //find the iFrame using its mangled asp.net name, and set its source
                var iframe = jQuery("iframe[id*="+controlId+"]");  
                iframe.attr('src', modalUrl);
                iframe.attr('width', 0);
                iframe.attr('height', 0);
                iframe.css('backgroundColor', '#ffffff');

                //give the dialog div id=controlId, makes it easier to uniquely reference later on
                iframe.parent('.registrationDialogDiv').removeAttr("id").attr("id", controlId);

                //show dialog
                $("#" + controlId).dialog("open");
            };

            this.closeRegistartionDialog = function () {
                //close all dialogs
                jQuery('.ui-dialog-content').dialog("close");

                //hide, and refresh iframe src
                $('#' + context.controlId).find('.registrationDialogIframe').attr({
                    "height": "0",
                    "width": "0",
                    "src": context.iFrameURL
                });
                
                //.css({ 'height': '0' + "px", 'width': '0' + "px" });  --> disabled because causes display issues in IE7
            };

            //Main function for cross domain communication
            this.invokeCdAccessJsFuction = function (url) {
                if (url != "") {
                    var params = context.getURLParam(url), heightPaddingContent = 10, lastHeight = parseInt(params[0], 10), topPosition = 0, closeWindowStatus = params[3].toString(), dialogWidth = parseInt(params[4], 10), widthPadding = 20;

                    if (closeWindowStatus == 'false') {
                        if (lastHeight > 0) {
                            //topPosition = ($(window).height() - lastHeight) / 2 + "px";		
                            $('.registrationDialogClass').css({
                                'height': (heightPaddingContent + lastHeight) + "px",
                                'width': (widthPadding + dialogWidth) + "px"
                            }).find('iframe.registrationDialogIframe').css({ 'height': lastHeight + "px", 'width': dialogWidth + "px" });

                        }

                        if (params.length > 3) {
                            if (params[1].toString() == 'true') {
                                context.closeRegistartionDialog();
                                if (params[2].length > 0 && typeof params[2] != 'undefined') {
                                    window.location.href = params[2];
                                } else {
                                    window.location.reload();
                                }
                            }
                        }
                    } else {
                        context.closeRegistartionDialog();
                    }
                    if (dialogWidth > 400) {
                        leftPosition = ($(window).width() - dialogWidth) / 2 + "px";
                        $('.registrationDialogClass').css("left", leftPosition);
                    }
                }

            };

            this.getURLParam = function (strHref) {
                var params = [];
                if (strHref.indexOf("?") > -1) {
                    var strQueryString = strHref.substr(strHref.indexOf("?")).toLowerCase();
                    var aQueryString = strQueryString.split("&");
                    for (var iParam = 0; iParam < aQueryString.length; iParam++) {
                        var aParam = aQueryString[iParam].split("=");
                        params[iParam] = aParam[1];
                    }
                }
                return params;
            };

            //call ctor when doc ready
            $(function () {
                init();
            });

            return this;
        };

        return new _userRegistration();
    } ());
} (window, bc, jQuery))