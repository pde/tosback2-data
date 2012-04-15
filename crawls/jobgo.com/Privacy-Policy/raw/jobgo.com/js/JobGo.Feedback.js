(function () {
    JobGo.Feedback = function (
        dialogSelector,
        showButtonSelector,
        sendButtonSelector,
        textareaSelector,
        url,
        texts
    ) {
        this.texts = $.extend({
            feedbackEmpty: 'Feedback is empty',
            feedbackSent: 'Feedback sent successfully'
        },texts);
        // This is the modal dialog component
        this.dialog = new JobGo.Dialog.Modal(
            // Dialog element selector
            dialogSelector,
            // Don't open automatically
            false,
            // options
            {
                maxWidth: 700,
                maxHeight: 300,
                minHeight: 300,
                dialogClass: 'JobGoDialog feedbackDialog'
            }
        );
        // Button that will scroll with the page.
        this.showButton = $(showButtonSelector);
        // Button that sends the feedback
        this.sendButton = $(sendButtonSelector);
        // Feedback will be sent to this url.
        this.url = url;
        // Feedback textarea
        this.textarea = $(textareaSelector);
        // Run the initialization
        this.init();
    }

    $.extend(JobGo.Feedback.prototype, {
        init: function () {
            this.initShowButton();
            this.initSendButton();
        },
        initShowButton: function () {
            this.showButton.click($.proxy(this.open, this));
        },
        initSendButton: function() {
            this.sendButton.click($.proxy(this.send, this));
        },
        open: function () {
            this.dialog.show();
        },
        close: function () {
            this.textarea.val('');
            this.dialog.hide();
        },
        send: function() {
            if (!this.textarea.val()) {
                JobGo.Notice.setError(this.texts.feedbackEmpty);
                this.dialog.reposition();
                return;
            }
            var me = this;
            $.post(this.url,
                {
                    feedback: this.textarea.val(),
                    page: window.location.href
                },
                function(data){
                    var response = $.parseJSON(data);
                    if (response.error) {
                        JobGo.Notice.setError();
                    } else {
                        JobGo.Notice.setNotice(me.texts.feedbackSent);
                    }
                    me.close();
                }
            );
        }
    });
})();