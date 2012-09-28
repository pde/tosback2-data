/************************* Ratting Module Js Code *******************************/
//Create Global Object
var reg = reg || {};

(function (window, reg, $, undefined) {
    /**
    * User Registration module
    */
    reg.userRegistration = (function () {
        function _userRegistration() {
            //Global variables	
            var context = this, iframeURL = "";
            var $dialogDiv;

            var init = function () {
                var registrationDialogCssId = "registrationDialogStyle";
                if (!$('#' + registrationDialogCssId)[0]) {
                    var head = document.getElementsByTagName('head')[0], link = document.createElement('link');
                    link.id = registrationDialogCssId;
                    link.href = "/styles/noncms/registrationdialog.css";
                    link.rel = 'stylesheet';
                    link.type = 'text/css';
                    head.appendChild(link);
                }
                $('.registrationDialogDiv').dialog({
                    autoOpen: false,
                    closeOnEscape: true,
                    draggable: false,
                    resizable: false,
                    modal: true,
                    width: 'auto',
                    height: 'auto',
                    dialogClass: 'VariableWidth VariableWidth-ui-dialog registrationDialogClass'
                });
                $('.registrationDialogClass .ui-dialog-titlebar .ui-dialog-titlebar-close').unbind('click');
                $('.registrationDialogClass .ui-dialog-titlebar .ui-dialog-titlebar-close').bind('click', function (evt) {
                    evt.preventDefault();
                    context.closeRegistartionDialog();
                });
                var iframe = $('.registrationDialogDiv').find('iframe');
                context.iFrameURL = iframe.attr('src');

            };

            //Style, and Open registration dialog window
            this.openRegistartionDialog = function (controlId) {

                $(".ui-dialog-content").dialog("close");
                modalUrl = jQuery("input[id*=" + controlId + "]").val();

                var requestPageUrl = window.location.href;
                if (requestPageUrl.indexOf("https") > -1) {
                    modalUrl = modalUrl.substring(0, modalUrl.indexOf("scheme=")) + "scheme=https";
                }

                var iframe = jQuery("[id*=" + controlId + "]");

                iframe.attr('src', modalUrl);
                iframe.css('backgroundColor', '#ffffff');
                $(iframe).parent('.registrationDialogDiv').removeAttr("id").attr("id", controlId);
                $dialogDiv = $("#" + controlId);
                $dialogDiv.dialog("open");
            };

            if (typeof (window.postMessage) != 'undefined') {
                //listen for cross-domain sizing message
                if (typeof(window.addEventListener) != 'undefined') {
                    window.addEventListener("message", function(event) {
                        var validSender = /.*\.bettycrocker\.com/;
                        if (validSender.test(event.origin)) {
                            context.invokeCdAccessJsFuction(event.data);
                        }
                    }, false);
                } else {
                    window.attachEvent('onmessage',function(e) {
                        var validSender = /.*\.bettycrocker\.com/;
                        //if (validSender.test(e.domain)) {
                            context.invokeCdAccessJsFuction(e.data);
                        //}
                    });
                }
            }

            this.closeRegistartionDialog = function () {
                if (!$dialogDiv) return;

                $dialogDiv.dialog("close");
                $dialogDiv.find('.registrationDialogIframe').attr({
                    "src": context.iFrameURL
                });

                $dialogDiv = undefined;
            };

            //Main function for cross domain communication
            this.invokeCdAccessJsFuction = function (url) {
                if (url != "" && $dialogDiv) {
                    var params = context.getURLParam(url),
                        heightPaddingContent = 10,
                        lastHeight = parseInt(params[0], 10),
                        topPosition = 0,
                        closeWindowStatus = params[3] !== undefined ? params[3].toString() : '',
                        dialogWidth = params[4] !== undefined ? parseInt(params[4], 10) : 0,
                        widthPadding = 20;

                    if (closeWindowStatus == 'false') {
                        if (lastHeight > 0) {
                            $dialogDiv.parents('.registrationDialogClass').css({
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
                                    window.location.href = window.location.href;
                                }
                            }
                        }
                    } else {
                        context.closeRegistartionDialog();
                    }
                    if (dialogWidth > 400) {
                        leftPosition = ($(window).width() - dialogWidth) / 2 + "px";
                        $dialogDiv.parents('.registrationDialogClass').css("left", leftPosition);
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

            $(function () {
                init();
            });

            return this;
        };

        return new _userRegistration();
    } ());
} (window, reg, jQuery))
