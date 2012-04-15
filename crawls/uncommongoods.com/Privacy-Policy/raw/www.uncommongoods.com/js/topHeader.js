var alertTimerId =0 ;
$(window).resize(function() {
			checkIEVer();
});
$(document).ready(
		
		function(ev) {
			
		 $(this).mouseover(function(e) {
			 	var ids = e.target.id ;
			 	if(ids.indexOf('cart')!=-1){
			 		clearTimeout(alertTimerId);			 	
			 		document.getElementById('menubar').style.display='none';
			 	}
			 	
			});
			checkIEVer();
			$("#menubar").mouseleave(function() {
				$('#menubar').hide(); // true
			});
			$(".cartTop").addClass("cartTopNoClick")
			/** GIFTFINDER* */

			// select all the a tag with name equal to modal
			$('a[name=modal]').click(function(e) {
				// Cancel the link behavior
					e.preventDefault();

					// Get the A tag
					var id = $(this).attr('href');

					// Get the screen height and width
					var maskHeight = $(document).height();
					var maskWidth = $(window).width();

					// Set heigth and width to mask to fill up the whole screen
					$('#mask').css( {
						'width' : maskWidth,
						'height' : maskHeight
					});

					// transition effect
					$('#mask').fadeIn(1000);
					$('#mask').fadeTo("slow", 0.5);

					// Get the window height and width
					var winH = $(window).height();
					var winW = $(window).width();

					// Set the popup window to center
					$(id).css('top', winH / 2 - $(id).height() / 2);
					$(id).css('left', winW / 2 - $(id).width() / 2);

					// transition effect
					$(id).fadeIn(2000);

				});

			// if close button is clicked
			$('.window .close').click(function(e) {
				// Cancel the link behavior
					e.preventDefault();

					$('#mask').hide();
					$('.window').hide();
				});

			// if mask is clicked
			$('#mask').click(function() {
				$(this).hide();
				$('.window').hide();
			});
		
				$('#mycarouselRecent').jcarousel( {
				vertical : true,
				scroll : 4
			});

			$('#mycarouselRecentHome').jcarousel( {

				scroll : 10
			});
			$('#mycarouselWindowShop').jcarousel( {
				wrap : 'circular',
				scroll : 5
			});

		});

function getEventTrigger(e)
{ 
	try
	  {
		var targ;
		if (!e) var e = window.event;
		if (e.target) targ = e.target;
		else if (e.srcElement) targ = e.srcElement;
		if (targ.nodeType == 3)  
			targ = targ.parentNode;
		
		if(targ.id=="body" ){
			document.getElementById('menubar').style.display='none';
			toggleCartOut();
		}
		if(targ.id=="hpContent" ){
			document.getElementById('menubar').style.display='none';
			toggleCartOut();
		}
	  }
	catch(err)
	  {
		//document not ready
	  }
	
}
/** Compatibility Mode **/
function checkIEVer(){
	var IE = (navigator.appVersion.indexOf("MSIE 6.")==-1) ? false : true;
	if(!IE)
		IE = (navigator.appVersion.indexOf("MSIE 7.")==-1) ? false : true;
	if(IE){
		 var elem = document.createElement('div');
		 elem.innerHTML = '<!--[if IE 6]><div class="ie6"></div><![endif]--><!--[if IE 7]><div class="ie7"></div><![endif]--><!--[if IE 8]><div class="ie8"></div><![endif]-->';
		 var  __IE__ = parseInt(elem.firstChild.className.substring(2), 0);
	     elem = null;
	     if(__IE__!=8){ 
			var initWidth = 1000;
			var intx = document.documentElement.clientWidth;
			var w = (intx - initWidth);
			if (w > 0) {
				var sze = w / 2;
				var finalRight = (sze + 120);
				$('.cartTop').css('right',finalRight+'px');
			} else {
				var sze = w/2.5;
				var finalRight = (sze);
				$('.cartTop').css('right',finalRight+'px');
			}
	     }
	}
}
function toggle_show(id) {
	document.getElementById('menubar').style.display='none';
	var ecart = document.getElementById(id);
	
	if(ecart!=null){
		var current = ecart.style.display ;
		if(current=='block'){
			toggle_hide();
		}else{
			ecart.style.display = 'block';
			$(".cartTop").removeClass("cartTopNoClick").addClass("cartTopClick");
		}	
	}
	
}
function toggle_hide() {
	$(".cartTop").removeClass("cartTopClick").addClass("cartTopNoClick");
	if(document.getElementById('cartBot')!=null){
		var ecart = document.getElementById('cartBot');
		ecart.style.display = 'none';
	}
}

function toggleCartOut() {
	if(document.getElementById('cartBot')!=null){
		var current = document.getElementById('cartBot').style.display ;
		if(current=='block'){
			document.getElementById('menubar').style.display='none';
			alertTimerId = setTimeout(function(){toggleCartTimer()}, 3000);
		}
	}
}
function toggleCartTimer() {
	
	if(document.getElementById('cartBot')!=null){
		var current = document.getElementById('cartBot').style.display ;
		if(current=='block'){
			toggle_hide();
		}
	}
}

function addToCart() {

	var showCart = $('#showCart').val();
	if (showCart == "showcart") {
		toggle_show('cartBot');
	} else {
		toggle_hide();
	}
	
}

function urlRedirect(form) {
	form = $(form);
	var keywords = "";
	var dataString = "";
	var recipients = document.getElementsByName("recipients")[0].value
	if (recipients != null && recipients != "" && recipients != "0") {
		keywords += "&recipients=" + recipients;
	}
	var prices = document.getElementsByName("prices")[0].value
	if (prices != null && prices != "" && prices != "0") {
		keywords += "&" + prices;
	}
	var occasions = document.getElementsByName("occasions")[0].value
	if (occasions != null && occasions != "" && occasions != "0") {
		keywords += "&occasions=" + occasions;
	}
	var categories = document.getElementsByName("categories")[0].value
	if (categories != null && categories != "" && categories != "0") {
		keywords += "&gf_categories=" + categories;
	}
	if ($.browser.msie) {
		dataString = "?displayedproducts=12&q=*" + keywords
				+ "&source=giftfinder";
	} else {
		dataString = "?displayedproducts=12&q=*" + keywords
				+ "&source=giftfinder";
	}
	if (keywords == "") {
		if ($.browser.msie) {
			var text = '<p> Please choose at least one recipient, occasion, price range,  or category above.</p>';

		} else {
			$("#message p").remove();
			$(
					"<p>"
							+ "Please choose at least one recipient, occasion, price range,  or category above."
							+ "</p>").appendTo("#message");
		}

		return false;
	} else {
		window.location = document.forms['giftFinder'].action + dataString;
	}
	return true;
}

/** **********DROPDOWN****************** */

function stickChild(parentId) {

	$('.dropSubs li a:first-child').each(function() {
		var firstCId = $(this).attr('id');
		var firstCIdWithNumber = new String('r0' + firstCId);
		$(this).removeClass('currentDropSub', 10);
		if (firstCIdWithNumber == parentId) {
			$(this).addClass('currentDropSub');
			return false;
		}
	});
}
function createChild(id) {

	$('.dropSubs li a:first-child').each(function() {
		var firstCId = $(this).attr('id');
		var firstCIdWithNumber = new String('r0' + firstCId);
		$(this).removeClass('currentDropSub', 10);
	});
	$("#dynamic li").each(function() {
		var child = $(this).attr('id');
		var parentClass = $(this).attr('class');
		var st = new String(parentClass);
		var childr = new String("r" + child);
		if (childr == id) {
			document.getElementById(id).style.display = "block";
		} else {
			document.getElementById(childr).style.display = "none";
		}
	});
}
function positionMenu(parentId, widthOfTheImages, top) {
	var initWidth = 1000;
	var intx = document.documentElement.clientWidth;
	var w = (intx - initWidth);
	if (w > 0) {
		var sze = w / 2;
	} else {
		var sze = 0;
	}
	var pushLeft = (sze + widthOfTheImages);
	$('.dropdown').css('left', pushLeft + 'px');
	$('.dropdown').css('top', top + 'px');
	
}
function createSubs(parentId, childId, sze, top) {
	var IE = (navigator.appVersion.indexOf("MSIE")==-1) ? false : true;
	if(IE){
		 var elem = document.createElement('div');
		 elem.innerHTML = '<!--[if IE 8]><div class="ie8"></div><![endif]-->';
		 var  __IE__ = parseInt(elem.firstChild.className.substring(2), 0);
	     elem = null;
	     if(__IE__==8){
	    	 IE=false;
	     }
     }	 
	 if(!IE){
	
		
		
		
		$('.dropdown').show();
		positionMenu(parentId, sze, top)
	
		var i = 0;
		$("#dynamic li").each(function() {
			var parentClass = $(this).attr('class');
			var child = $(this).attr('id');
			var childr = new String("r" + child);
			var parent = new String(parentClass);
			if (parent == parentId) {
				document.getElementById(parentId).style.display = "block";
				document.getElementById(childId).style.display = "block";
				$('.dropSubs li a:first-child').each(function() {
					var firstCId = $(this).attr('id');
					var firstCIdWithNumber = new String('r0' + firstCId);
					if (firstCIdWithNumber == childId) {
						$(this).addClass('currentDropSub');
					} else {
						$(this).removeClass('currentDropSub');
	
					}
				});
			} else {
				document.getElementById(parent).style.display = "none";
				document.getElementById(childr).style.display = "none";
			}
			i++;
		});
	}
}
function submitForm() {
	var keyQ = "q=" + document.forms['subForm'].q.value;
	document.forms['subForm'].action = "/search.html/find/?" + keyQ;
	document.forms['subForm'].action.submit();
}
function enterKey(e) {
	
	var keyCode = (window.event) ? e.which : e.keyCode;
	if (keyCode == 13){
		submitForm();
	} else {
		return true;
	}
}