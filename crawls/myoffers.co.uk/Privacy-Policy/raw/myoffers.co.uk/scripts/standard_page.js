/// <reference path="libraries/jquery-vsdoc2.js" />

var runOnceScript = false;

function pageLoad() {

    $(document).ready(function() {
    
    if (!runOnceScript) {
        
        // Frequently asked questions hide show
        $('div#standard-layout div.faq div.panel-container dl').each(function() {
            $('dd', this).hide();
            $('dt', this).wrapInner('<a href="#" class="primary-link"></a>')
            $('dt a', this).click(function(event) {
                $(this).parent('dt').nextAll('dd').slideToggle('slow');
                event.preventDefault()
            });
        });

        $('div#utility-panel input:submit').click(function () {
            ValidationItems();
            if ($('div#utility-panel div.sign-in fieldset div.validation-summary:visible').length > 1) {
                $('div#utility-panel div.sign-in fieldset div.validation-summary:first').hide();
            }
            if (Page_IsValid) {
                $('body').css('cursor', 'progress');
            };
        });

        if ($('div#utility-panel span.validation-item:visible')) {
            $('body').css('cursor', 'default');
        };
            
		// Hide forgotten password panel and toggle link
        $('div#utility-panel div.sign-in ul.secondary-link').prepend('<li><a href="/" id="forgotten-password-link">Password forgotten?</a></li>');
        $('div#utility-panel div.forgotten').hide();
        $('div#utility-panel div.sign-in a#forgotten-password-link').click(function (event) {
            event.preventDefault();
            if ($('div#utility-panel div.forgotten').is(':visible')) {
                $('div#utility-panel div.forgotten').slideUp('slow');
            } else {
                $('div#utility-panel div.forgotten').slideDown('slow');
            }
        });

		function ValidationItems() {
			$('div#utility-panel fieldset ul li').each(function() {
				if ($('span.validation-item', this).is(':visible')) {
					$('span.validation-item', this).text("");
				} else {
					$('span.validation-item', this).text("");
				};
			});
		}

        // Use lightbox technique for popup elements
        $("div#standard-layout a.popup").mousedown(function(event) {
            event.preventDefault();
            var maintitle = this.title || $(this).text();
            $(this).lightBox({ iframeUrl: this.href, boxTitle: maintitle, iframeWidth: 700, iframeHight: 600 });
        });

        $('div.contact-us div.button-container input').click(function () {
        	ValidationItems();

        	if (Page_IsValid) {
        		$('body').css('cursor', 'progress');
        	};
        });
		
		$('div.contact-us fieldset input, div.contact-us fieldset select').change(function () {
        	ValidationItems();
        });
		
        function ValidationItems() {
        	$('div.contact-us fieldset > ul li').each(function () {
        		if ($('span.validation-item', this).is(':visible')) {
        			$('span.validation-item', this).text("");
        			$(this).css('background', '#F9DBD9').css('padding-left', '6px');
        		} else {
        			$('span.validation-item', this).text("");
        			$(this).css('background', 'none').css('padding-left', '0');
        		};
        	});
        };
        
        runOnceScript = true;
        };
    });
}	