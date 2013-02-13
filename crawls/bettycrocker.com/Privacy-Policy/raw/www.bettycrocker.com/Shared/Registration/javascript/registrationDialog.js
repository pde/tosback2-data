(function ($) {
    $('[data-reg-popup]').live('click', function (e) {
        e.preventDefault();

        var urlParams = $(this).attr('data-url-params');
        var jsonParams = {};
        if (urlParams) {
            jsonParams = $.parseJSON(urlParams);
        }
        reg.userRegistration.openRegistrationDialog(jsonParams);
    });
})(jQuery);

var reg = reg || {};

(function (window, reg, $, undefined) {
    /**
    * User Registration module
    */
    reg.userRegistration = (function () {

        function userReg() {
            var context = this;
            var init = function () {
                self.registrationDialogDiv = $('.registrationDialogContainer');

                self.registrationDialogDiv.dialog({
                    autoOpen: false,
                    closeOnEscape: true,
                    draggable: false,
                    resizable: false,
                    modal: true,
                    width: 'auto',
                    height: 'auto',
                    dialogClass: 'registrationDialogClass'
                });

                self.registrationDialogDiv.parent().find('.ui-dialog-titlebar .ui-dialog-titlebar-close')
                    .unbind('click')
                    .bind('click', function (e) {
                        e.preventDefault();
                        context.closeRegistartionDialog();
                    });

                self.iframeUrl = self.registrationDialogDiv.find('iframe').attr('src');

            };

            //Style, and Open registration dialog window
            this.openRegistrationDialog = function (options) {

                var modalUrl = self.registrationDialogDiv.attr('data-modal-url');

                if (window.location.href.indexOf('https') > -1) {
                    modalUrl = modalUrl.substring(0, modalUrl.indexOf("scheme=")) + "scheme=https";
                }

                if ("esrc" in options) {
                    modalUrl = modalUrl + "&esrc=" + options.esrc;
                }
                if ("isRegistrationFirstStep" in options) {
                    modalUrl = modalUrl + "&isRegistrationFirstStep=" + options.isRegistrationFirstStep;
                }
                if ("returnUrl" in options) {
                    modalUrl = modalUrl + "&returnUrl=" + options.returnUrl;
                }
                if("RegAction" in options)
                {
                    modalUrl = modalUrl + "&RegAction=" + options.RegAction;
                }

                self.registrationDialogDiv.find('iframe').attr('src', modalUrl);
                self.registrationDialogDiv.dialog('open');
            };

            this.closeRegistartionDialog = function () {
                self.registrationDialogDiv.dialog('close');
            };

            //Main function for cross domain communication
            this.invokeModalResize = function (url) {
                if (url != "") {
                    var params = context.getURLParam(url),
                        heightPaddingContent = 10,
                        lastHeight = parseInt(params[0], 10),
                        closeWindowStatus = params[3] !== undefined ? params[3].toString() : '',
                        dialogWidth = params[4] !== undefined ? parseInt(params[4], 10) : 0;

                    if (closeWindowStatus == 'false') {
                        if (lastHeight > 0) {
                            $('.registrationDialogClass').find('iframe').css({ 'height': (lastHeight + heightPaddingContent) + "px", 'width': dialogWidth + "px" });
                            self.registrationDialogDiv.dialog('option', 'position', self.registrationDialogDiv.dialog('option', 'position'));
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
        }

        ;

        return new userReg();
    } ());
} (window, reg, jQuery));