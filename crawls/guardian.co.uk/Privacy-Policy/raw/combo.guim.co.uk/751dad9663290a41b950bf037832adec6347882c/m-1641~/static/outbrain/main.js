/* m-1641~/static/outbrain/main.js */
jQ(function(){

    var OBComponent = {

        init: function() {
            this.contentId  = jQ('meta[name="content-id"]').attr('content'),
            this.pageUrl    = 'http://www.guardian.co.uk' + this.contentId;

            // Only insert components if we're allowed to
            if (guardian.page &&
                guardian.page.showRelated === true &&
                guardian.page.showCommercialRelated === true) {
                    this.insertOBComponent();
                    this.loadOBLibrary();
            }
        },

        loadOBLibrary: function() {
            var self = this;

            if (typeof(OBR) != 'undefined') {
                // This is only temporarily, until Outbrain is removed from R2
                OBR.extern.reloadWidget();
                self.setupWidgets();
            } else {
                jQ.getScript('http://widgets.outbrain.com/outbrain.js', function() {
                    self.setupWidgets();
                });
            }
        },

        setupWidgets: function() {
            // Load the widget and setup callbacks
            this.setupCallbacks();
            this.setupExplainers();
        },

        insertOBComponent: function() {
            var obContainerNode = jQ('.outbrain-container'),
                obInternalHtml  = '<div class="OUTBRAIN first internal trackable-component" data-src="'+this.pageUrl+'" data-widget-id="AR_1" data-ob-template="guardian" data-component="comp: Outbrains: guardian links"></div>',
                obPaidHtml      = '<div class="OUTBRAIN sponsored trackable-component" data-src="'+this.pageUrl+'" data-widget-id="AR_2" data-ob-template="guardian" data-component="comp: Outbrains: sponsored links"></div>';
                containerHtml   = '<div class="outbrain-container">'+obInternalHtml+obPaidHtml+'</div>';

            //jQ('.article #box > .share-links').after(containerHtml);
            obContainerNode.parent().removeClass('six-col').addClass('eight-col');
            obContainerNode.html(obInternalHtml+obPaidHtml);
            obContainerNode.show();
        },

        fixOBComponent: function(id) {
            var node = jQ('.outbrain-container div[data-widget-id="'+id+'"]');

            node.find('.ob_box_cont').addClass('component');
            node.find('.ob_org_header').addClass('hd b1');
            node.find('.ob_org_header div').wrap('<h2></h2>');
            node.find('.hd').prepend('<a href="#" class="explainer-link">What\'s this?</a>');

            var titleNode = node.find('.hd h2 div'),
                title     = titleNode.text().replace('guardian', 'Guardian');

            titleNode.text(title);
        },

        setupCallbacks: function() {
            var self = this;
            OBR.extern.onOdbReturn("AR_1", function() {
                if (OBR.extern.getCountOfRecs("AR_1") > 0) {
                    self.fixOBComponent("AR_1");
                }
            });

            OBR.extern.onOdbReturn("AR_2", function() {
                if (OBR.extern.getCountOfRecs("AR_2") > 0) {
                    self.fixOBComponent("AR_2");
                }
            });
        },

        setupExplainers: function() {
            jQ(document).delegate('.outbrain-container .explainer-link', 'click', function(e) {
                e.preventDefault();

                var sponsoredText = "These are paid-for links provided by Outbrain, and may or may not be relevant to the other content on this page. To find out more information about driving traffic to your content or to place this widget on your site, visit outbrain.com. We welcome your feedback at <a href=\"mailto:userhelp@guardian.co.uk\" target=\"_blank\">userhelp@guardian.co.uk</a> or <a href=\"mailto:feedback@outbrain.com\" target=\"_blank\">feedback@outbrain.com</a>. You can read Outbrain's privacy and cookie policy  <a href=\"http://www.outbrain.com/legal/privacy/\" target=\"_blank\">here</a>.",
                    internalText  = "These are links to Guardian pages suggested by Outbrain, which may or may not be relevant to the other content on this page. We welcome your feedback at <a href=\"mailto:userhelp@guardian.co.uk\" target=\"_blank\">userhelp@guardian.co.uk</a> or <a href=\"mailto:feedback@outbrain.com\" target=\"_blank\">feedback@outbrain.com</a>. You can read Outbrain's privacy and cookie policy  <a href=\"http://www.outbrain.com/legal/privacy/\" target=\"_blank\">here</a>.",
                    explainerText = jQ(this).parent().parent().hasClass('AR_1') ? internalText : sponsoredText;

                var position = jQ(this).offset(),
                    overlayNode = jQ('<div class="outbrain-explainer"><a href="#" class="close"></a><p>'+explainerText+'</p></div>');

                // Listen for events to close the overlay
                overlayNode.find('.close').click(function(e) {
                    e.preventDefault();
                    overlayNode.remove();
                });

                if(jQ('.outbrain-explainer').is(":visible")) {
                    jQ('.outbrain-explainer').remove();
                }

                // Position the overlay
                overlayNode.css({'top':  position.top+20,
                                 'left': position.left-393});

                // ....and showtime
                jQ('.ob_box_cont').append(overlayNode);
                overlayNode.fadeIn();

                // Close the overlay if there's clicks outside it
                jQ(document).click(function(e) {
                    overlayNode.remove();
                });
                jQ('.outbrain-explainer, .outbrain-explainer *').click(function(e) {
                  if (jQ(e.target)[0].tagName.toLowerCase() != 'a') {
                    e.stopPropagation();
                    return false;
                  }
                });
            });
        }

    };

    OBComponent.init();
});
