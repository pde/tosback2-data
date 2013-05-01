$(function() {
	//$('#tabs-popular > ul').tabs({ fx: { opacity: 'toggle' } });
	$('.mostpopular').tabs({ fx: { opacity: 'toggle' } });
	$('#promotion-module > ul > li > p:even').css("height", "100px");

	$('a.button > img').hover(
		function() {
			$(this).attr('src', function() {
				return this.src.replace(/_off/, '_on');
			});
		},
		function() {
			$(this).attr('src', function() {
				return this.src.replace(/_on/, '_off');
			});
		}
	);

	$('.close').hover(
		function() {
			$(this).attr('src', function() {
				return this.src.replace(/_off/, '_on');
			});
		},
		function() {
			$(this).attr('src', function() {
				return this.src.replace(/_on/, '_off');
			});
		}
	);

	$('form > #searchInput').focus(
		function() {
			$(this).attr('value', function() {
				return (this.value == 'Search The Chronicle')? '' : this.value;
			});
		}
	).blur(
		function() {
			$(this).attr('value', function() {
				return (this.value == '')? 'Search The Chronicle' : this.value;
			});
		}
	);

	$('#jobsearch').focus(
		function() {
			$(this).attr('value', function() {
				return (this.value == 'Search Jobs')? '' : this.value;
			});
		}
	).blur(
		function() {
			$(this).attr('value', function() {
				return (this.value == '')? 'Search Jobs' : this.value;
			});
		}
	);

});

function btnOver(o){
 var img = o.getElementsByTagName('img')[0];
 var src = img.src.replace('_off', '_on');
 img.src = src;
}

function btnOut(o){
 var img = o.getElementsByTagName('img')[0];
 var src = img.src.replace('_on', '_off');
 img.src = src;
}

function mod_unescape (str)
{
	str = "" + str;
	while (true)
	{
		var i = str . indexOf ('+');
		if (i < 0)
			break;
		str = str . substring (0, i) + '%20' +
			str . substring (i + 1, str . length);
	}
	return unescape (str);
}
var chronShow = function(hash) {
//hash.w.show();
hash.w.fadeIn('slow', function() {hash.w.fadeIn('slow')});
$('embed').hide();
$('.multimedia').hide();
}
var chronHide = function(hash) {
       //hash.w.hide();
       //hash.o.hide();
       hash.w.fadeOut('slow', function() {hash.o.fadeOut('slow')});
       $('embed').show();
       $('.multimedia').show();

}


//disqus javascript
//This function is a hook added after disqus is loaded to change some text to match up with styles in irise
function changeSubscribeText()
{
	//adding a new element for text
	$('.dsq-options .dsq-item-sort').after("<span>Follow comments: </span>");
	//changing text for subscription by email
	$('.dsq-options #dsq-subscribe').find('a').text("by e-mail");
	//changing text for subscription by rss
	$('.dsq-options .dsq-subscribe-rss').find('a').text("by RSS");
}
//This function is a hook added after disqus is loaded to prepend some text to match up with styles in irise
function placeHeading()
{
	$("#disqus_thread").prepend("<div id='commentHeader'>Comments</div><div id='poweredByDisqus'><a href='http://disqus.com' class='dsq-brlink'>Powered by <span class='logo-disqus'>Disqus</span></a></div>");
	// if we are not logged in lets replace the toolbar with a disqus image
	if ($("#dsq-new-post").hasClass("dsq-unauthenticated")) {
		//$("#dsq-toolbar-dropdown").html('<a href="http://disqus.com"><img src="http://mediacdn.disqus.com/1296789872/images/embed/disqus-logo.png" alt="Disqus Comments" style="margin-bottom:5px;"></a>');
		$('#dsq-toolbar-dropdown #dsq-toolbar-dropdown-wrap > ul > li.dsq-login-link').empty();
	}
	if ($('.dsq-global-toolbar-left').length > 0) {
		$('.dsq-global-toolbar-left').hide();
	}

}

//crm web-to-lead helper functions
function getElement(aID)
{
	return (document.getElementById) ? document.getElementById(aID) : document.all[aID];
}

function getIFrameDocument(aID){
	var rv = null;
	var frame=getElement(aID);
	// if contentDocument exists, W3C compliant (e.g. Mozilla)
	if (frame.contentDocument)
		rv = frame.contentDocument;
	else // bad Internet Explorer  ;)
		rv = document.frames[aID].document;
	return rv;
}

function adjustMyFrameHeight(id)
{
	var frame = getElement(id);
	var frameDoc = getIFrameDocument(id);
	frame.style.height = frameDoc.body.scrollHeight+'px';
	//alert(frame.style.height);
}
