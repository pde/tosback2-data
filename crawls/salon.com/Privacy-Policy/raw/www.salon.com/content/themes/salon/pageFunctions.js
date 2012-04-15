var inprog = 0;
var speed = '250';

// $ noConflict
jQuery.noConflict();

function salonPop(url,width,height,features) {
	var w = window.open(url, 'newwindow', 'width='+width+',height='+height+',scrollbars=1,toolbar=0,location=0,menubar=0');
	w.blur();
}

function auditLinkTargets(container_name) {
    // make sure we have JS & a DOM like we expect.
    if (!document.getElementById || !document.getElementsByTagName) return true;
    if (!document.getElementById(container_name)) return true;

    // we will only re-target links in named container (i.e. excludes header & footer)
    var container = document.getElementById(container_name);
    var links = container.getElementsByTagName('a');

    var ct = links.length;
    for (var i=0; i<ct; i++) {
        if (links[i].target) {  // skip link with target attribute set, except
                                // change 'new' to '_blank'
            if (links[i].target == 'new') {
                links[i].target = '_blank';
            }

        // check for class-based manual over-ride
        } else if (/\s?target_new\s?/.test(links[i].className)) {  // new window
            links[i].target = '_blank';
        } else if (/\s?target_self\s?/.test(links[i].className)) { // force here
            // do nothing

        // otherwise process href and choose target
        } else {
            // if url doesn't contain :// or url contains salon.com in domain name. fantastic
            if (/^\w+:\/\//.test(links[i].href)==false || /^\w+:\/\/(\w+\.)*salon(planet)?\.(com|net)\//i.test(links[i].href)) {
                // salon, do nothing
            } else {
                links[i].target = '_blank';
            }
        }
    }
} 

function auditHeadlines(container_name) {
    // make sure we have JS & a DOM like we expect.
    if (!document.getElementById || !document.getElementsByTagName) return true;
    if (!document.getElementById(container_name)) return true;

    // we will only re-target links in named container (i.e. excludes header & footer)
    var container = document.getElementById(container_name);
    var heads = jQuery('.headline');

    var ct = heads.length;
    var j = 0;
    for (var i=0; i<ct; i++) {
		var h = jQuery(heads[i]);
        if (h.data('href')) { 
			var link = document.createElement('A');
			jQuery(link).attr(h.data()).html(h.html());
			h.html(link);
			j++;
		}
	}
	return j;
}


// claim $ when document is scriptable
jQuery(document).ready(function($) {
	
	// tabbed-content switching
	$('.tabContent:first-child').show();
	$('.sectionTabs li a').not('.sectionTabs.related li a').click(function(e) {
		var activeTab = $(this).attr('rel');
		$(this).parents('.sectionHeader').find('a').removeClass('selected');
		$(this).addClass('selected').parents('.sectionHeader').parent().find('#'+activeTab).show().siblings().hide();
		e.preventDefault();
	});
	
	// topBar menu drop
	$('.topBar .parent').hover(function() {
		if (inprog == 0) {
			inprog = 1;
			$('ul:first', this).slideDown(speed);
		}
	}, function() {
		$('ul:first', this).slideUp(speed, function() {
			inprog = 0;
		});
	});
	
	// special message drop
	$('.primaryNavigation .message a').click(function(e) {
		var msg = '<p>A message to our readers:</p><p>We know, we know! Recently Salon readers have'
				+ ' been experiencing some technical difficulties as they click their way through our'
				+ ' site. At the beginning of the month, Salon completed a long-planned migration to a'
				+ ' new WordPress-based publishing platform. While this switchover from our antiquated'
				+ ' system has streamlined Salon\'s operations in many exciting ways, it has also resulted'
				+ ' in some short-term bugginess here and there, which we\'re working hard to correct.</p>'
				+ '<p>Readers have been having problems with the comments section and with various RSS feeds.'
				+ ' And yes, then there are the ads that appear where they should not.  We\'re in the process'
				+ ' of squishing these bugs as quickly as possible. But your feedback continues to be the best'
				+ ' source for identifying the remaining issues. So thank you for your patience and for continuing'
				+ ' to point out problems.</p>';
				
		$(this).toggleClass('open');
		$('.specialMessage').slideToggle(speed, function() {
			$(this).html(msg);
			$('.primaryNavigation .specialMessage a');
		});
		e.preventDefault();
	});
	
	// full menu drop
	$('.primaryNavigation .fullMenu a').click(function(e) {
		$(this).toggleClass('open');
		$('.menuContainer').not('.bottom').slideToggle(speed, function() {
			$('.primaryNavigation .fullMenu a');
		});
		e.preventDefault();
	});	

	auditLinkTargets('contentContainer');
	auditHeadlines('contentContainer');
	//cover actions
	$('a.coverAction').click( function(e) {
		e.preventDefault();
		var post_id = $(this).attr('id').substr(5); // remove 'mute-', 'prom-', 'demo-'
		var action = $(this).attr('href').substr(1); // remove #
		var priority = $(this).closest('ul').attr('class').substr(9); // remove 'priority-'
		var answer = confirm('Are you sure you want to ' + action + ' with priority ' + priority + '?');
		if ( answer ) {
			$('input#cover-actions-post_id').val( post_id );
			$('input#cover-actions-cover_action').val( action );
			$('form#cover-actions').submit();
		}
	});
	
	//otherNews classes (mostly for IE)
	if ($('.otherNews').length) {
		$('.otherNews .widget:nth-child(4n+4)').css('border-right','none');
		$('.otherNews .widget:nth-child(5)').css('clear','left');
	}
	
});
