var tid;
var tdelay;
var turl;

$(document).ready(function(){
    $("a").each(function(){
        var $a = jQuery(this);
        var href = this.href;
        if (href != null && !$a.is(".exempt")) {
        	var external = false;
        	// apply rule only if href starts with http and is not .gov or .mil
        	var hostCheck = new RegExp("^https?:\\/\\/" + window.location.host);
        	if ((href.match(/^http/)) && (!href.match(hostCheck))) {
	        	if ((!href.match(/^https?:\/\/[^\/]*\.(gov|mil)$/)) && (!href.match(/^https?:\/\/[^\/]*\.(gov|mil)\//))) {
	        		external = true;
	        	}
        	}
        	// force popup if class is .popup_link
        	if ($a.is('.popup_link')) { external = true; }
        	if (external) {
				$a.addClass('thickbox').addClass('external');
                $a.attr('href', '#TB_inline?height=200&width=400&inlineId=tb_external');
                $a.attr('title', '');
				tb_init(this);

                // on click, add external link code to the thickbox
                $a.click(function () {
				  var link = $(this);
                  $('#tb_external_thelink').html('<a id="tb_link" href="' + href + '">' + href + '</a>');
				  $("div#TB_closeAjaxWindow").before("<div id='TB_ajaxWindowTitle'><a id='ExLink' href='" + href + "'>External Link</a></div>");
				  $("a#ExLink").focus();
				  /*openNew = function(){
				  	window.open(href);
					tb_remove();
					return false;
				  }*/
				  $("a#tb_link").click(clearInterval(tid));
				  $("a#ExLink").click(clearInterval(tid));
				  $("#TB_window").bind('unload', function(){clearInterval(tid);});
				  turl = href;
				  tdelay = 8;
                  $("span#tb_timer").html(tdelay);
				  tid = setInterval("autoLoadExternalSite()", 1000);
                });
            }
        }
    });
});

function autoLoadExternalSite() {
    $("span#tb_timer").html(--tdelay);
    if (tdelay == 0) {
        clearInterval(tid);
        window.location = turl;
    }
}

function tb_show_custom(fullname, location) {
    $("#tb_external_thelink").html('<a id="tb_link" href="'+location+'">'+location+'</a>');
    tb_show('<a href="'+location+'" id="ExLink">'+fullname+'</a>','#TB_inline?height=200&width=400&inlineId=tb_external');
    $("a#ExLink").focus();
    $("a#tb_link").click(clearInterval(tid));
    $("a#ExLink").click(clearInterval(tid));
    $("#TB_window").bind('unload', function(){clearInterval(tid);});
    turl = location;
    tdelay = 8;
    $("span#tb_timer").html(tdelay);
    tid = setInterval("autoLoadExternalSite()", 1000);
}