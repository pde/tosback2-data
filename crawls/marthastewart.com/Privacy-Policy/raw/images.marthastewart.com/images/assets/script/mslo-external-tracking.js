/* audience science */
function DM_prepClient(csid, client) {
if (csid == 'G10942') {
client.DM_addEncToLoc("adzone", "mso.site/"+s.prop2);
    }
}
document.write(unescape("%3Cscript src='" + (document.location.protocol == "https:" ? "https://" : "http://")+ "js.revsci.net/gateway/gw.js?csid=G10942&auto=t' %3E%3C/script%3E"));


/* skim resources */
// document.write(unescape("%3Cscript src='" + (document.location.protocol == "https:" ? "https://" : "http://")+"s.skimresources.com/js/2948X595205.skimlinks.js' %3E%3C/script%3E"));

/*Nielsen Audience measurement Code */
function Nielsen_Event() {
    var d = new Image(1, 1);
    d.onerror = d.onload = function () {
      d.onerror = d.onload = null;
    };
    d.src = ["//secure-us.imrworldwide.com/cgi-bin/m?ci=us-404876h&cg=0&cc=1&si=", escape(window.location.href), "&rp=", escape(document.referrer), "&ts=compact&rnd=", (new Date()).getTime()].join('');
  };
Nielsen_Event();

/*
$(document).ready(function() {

	if ($('#ms-global-wrap').length && !$.cookie('ugc-offline')) {
		var $ugcMessage = '<div id="ugc-offline"><div class="ugc-offline-inner"><p class="ugc-offline-message">Thank you for visiting! While we are improving our site you may experience intermittent access to certain features. <a href="http://images.marthastewart.com/static_html/500.html">More info</a>.</p><a href="#close" class="close-message">Close</a></div></div>';

	// remove any #ugc-offline elements before inserting this one
	$('#ugc-offline').remove();
	
	// append the message
    $('body').prepend($ugcMessage);
	}

	// set the cookie if the close link is clicked
	$('#ugc-offline').find('.close-message').click(function(e){
		$.cookie('ugc-offline', 'true');
		$('#ugc-offline').hide();
		e.preventDefault();
	});

});
*/


